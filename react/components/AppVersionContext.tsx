import React, {
  useContext,
  createContext,
  useReducer,
  ReactNode,
  FC,
} from 'react'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

import EmptyAppDocs from './EmptyAppDocs'
import publishedQuery from '../graphql/published.graphql'

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
  appVersionsQueryResult,
  appName,
  appVersionFromUrl,
}: AppVersionProviderProps) {
  const hasVersion = !!appVersionFromUrl
  console.log({ appVersionsQueryResult })
  const majorFromQuery = `${appVersionsQueryResult.appMajors.latestMajor}.x`
  const availableMajors = appVersionsQueryResult.appMajors.publishedMajors

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
  const { route } = useRuntime()
  const app = route?.params?.app
  const appName = app ? app.split('@')[0] : 'vtex.io-documentation'
  const appVersionFromUrl = app?.split('@')[1]

  const { data, loading, error } = useQuery(publishedQuery, {
    variables: {
      appName,
    },
  })

  if (loading) {
    return null
  }

  if (error) {
    return <EmptyAppDocs />
  }

  return (
    <AppVersionProvider
      key={appName}
      appVersionsQueryResult={data}
      appName={appName}
      appVersionFromUrl={appVersionFromUrl}>
      {children}
    </AppVersionProvider>
  )
}

interface AppVersionProviderProps {
  children: ReactNode
  appVersionsQueryResult: AppMajorsQueryResponse
  appName: string
  appVersionFromUrl: string
}

interface AppMajorsQueryResponse {
  appMajors: {
    latestMajor: string
    publishedMajors: string[]
  }
}

export { EnhancedAppVersionProvider, useAppVersionState, useAppVersionDispatch }
