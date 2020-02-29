import React, {
  useContext,
  createContext,
  useReducer,
  ReactNode,
  FC,
} from 'react'
import { ApolloError } from 'apollo-client'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

import EmptyAppDocs from './EmptyAppDocs'

import appMajorsQuery from '../graphql/appMajors.graphql'

type Action =
  | { type: 'updateMajor'; value: string }
  | { type: 'updateAvailableMajors'; value: string[] }
  | { type: 'updateAppName'; value: string }
type Dispatch = (action: Action) => void
interface State {
  appName: string
  major: string
  availableMajors: string[]
}

const AppVersionStateContext = createContext<State | undefined>(undefined)
const AppVersionDispatchContext = createContext<Dispatch | undefined>(undefined)

function appVersionReducer(state: State, action: Action) {
  switch (action.type) {
    case 'updateMajor': {
      return { ...state, major: action.value }
    }
    case 'updateAvailableMajors': {
      return { ...state, availableMajors: action.value }
    }
    case 'updateAppName': {
      return { ...state, appName: action.value }
    }
    default: {
      return state
    }
  }
}

function AppVersionProvider({
  children,
  appMajorsQuery,
  appName,
  appVersionFromUrl,
}: AppVersionProviderProps) {
  const hasVersion = !!appVersionFromUrl
  const majorFromQuery = `${appMajorsQuery.appMajors.latestMajor}.x`
  const availableMajors = appMajorsQuery.appMajors.publishedMajors

  const [versionInfo, dispatch] = useReducer(appVersionReducer, {
    major: `${hasVersion ? appVersionFromUrl : majorFromQuery}`,
    availableMajors,
    appName,
  })

  return (
    <AppVersionStateContext.Provider value={versionInfo}>
      <AppVersionDispatchContext.Provider value={dispatch}>
        {children}
      </AppVersionDispatchContext.Provider>
    </AppVersionStateContext.Provider>
  )
}

function useAppVersionState() {
  const context = useContext(AppVersionStateContext)
  if (context === undefined) {
    throw new Error(
      'useAppVersionState must be used within a AppVersionProvider'
    )
  }
  return context
}

function useAppVersionDispatch() {
  const context = useContext(AppVersionDispatchContext)

  if (context === undefined) {
    throw new Error(
      'useAppVersionDispatch must be used within a AppVersionProvider'
    )
  }
  return context
}

const EnhancedAppVersionProvider: FC = ({ children }) => {
  const {
    route: {
      params: { app },
    },
  } = useRuntime()
  const appName = app ? app.split('@')[0] : 'vtex.io-documentation'
  const appVersionFromUrl = app && app.split('@')[1]

  const { data, loading, error } = useQuery(appMajorsQuery, {
    variables: {
      appName,
    },
  })

  if (loading) {
    return null
  }

  if (!!error) {
    return <EmptyAppDocs />
  }

  return (
    <AppVersionProvider
      key={appName}
      appMajorsQuery={data}
      appName={appName}
      appVersionFromUrl={appVersionFromUrl}>
      {children}
    </AppVersionProvider>
  )
}

interface AppVersionProviderProps {
  children: ReactNode
  appMajorsQuery: AppMajorsQueryResponse
  appName: string
  appVersionFromUrl: string
}

interface AppMajorsQueryResponse {
  appMajors: {
    latestMajor: string
    publishedMajors: string[]
  }
}

interface OuterProps {
  appMajorsQuery: {
    data: AppMajorsQueryResponse
    loading: boolean
    error?: ApolloError
  }
}

export { EnhancedAppVersionProvider, useAppVersionState, useAppVersionDispatch }
