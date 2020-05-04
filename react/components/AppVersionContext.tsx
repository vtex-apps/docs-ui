import React, {
  useContext,
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  FC,
} from 'react'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

import EmptyAppDocs from './EmptyAppDocs'
import publishedQuery from '../graphql/published.graphql'
import { IO_DOCUMENTATION } from '../modules/constantExports'

type Action =
  | { type: 'updateMajor'; value: string }
  | { type: 'updateAvailableMajors'; value: string[] }
  | { type: 'updateAppName'; value: string }
  | { type: 'updateAppVersion'; value: string }
  | { type: 'updateAvailableVersions'; value: string[] }
type Dispatch = (action: Action) => void
interface State {
  appName: string
  major: string
  availableMajors: string[]
  version: string
  availableVersions: string[]
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
    case 'updateAppVersion': {
      return { ...state, major: action.value }
    }
    case 'updateAvailableVersions': {
      return { ...state, availableMajors: action.value }
    }
    default: {
      return state
    }
  }
}

function AppVersionProvider({
  children,
  publishedQueryResult,
  appName,
  appVersionFromUrl,
}: AppVersionProviderProps) {
  const {
    appMajors: { latestMajor, publishedMajors },
    appVersions: { latestStable, publishedVersions },
  } = publishedQueryResult

  const hasVersion = !!appVersionFromUrl
  const majorFromQuery = `${latestMajor}.x`

  const [versionInfo, dispatch] = useReducer(appVersionReducer, {
    major: `${hasVersion ? appVersionFromUrl : majorFromQuery}`,
    availableMajors: publishedMajors,
    version: appVersionFromUrl || latestStable,
    availableVersions: publishedVersions,
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
  const { route, navigate } = useRuntime()
  const app = route?.params?.app || IO_DOCUMENTATION
  const [appName] = app.split('@')
  const appVersionFromUrl = app?.split('@')[1]

  const { data, loading, error } = useQuery(publishedQuery, {
    variables: {
      appName,
    },
  })

  // Just a bit hacky: It always check if the url has a trailing slash, setting it if not.
  // It's useful for README's that link to other files
  useEffect(() => {
    if (!appVersionFromUrl || route.path.endsWith('/')) {
      return
    }
    navigate({
      to: `${route.path}/`,
      replace: true,
      preventRemount: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.path])

  // Always set the app's version on the URL (except io-documentation)
  useEffect(() => {
    if (!app || appVersionFromUrl || !data?.appVersions?.latestStable) {
      return
    }
    const { params: currentParams } = route
    const {
      appVersions: { latestStable },
    } = data

    const updatedApp = `${app.split('@')[0]}@${latestStable}`
    navigate({
      page: route.id,
      params: { ...currentParams, app: updatedApp },
      replace: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if (loading) {
    return null
  }

  if (error) {
    return <EmptyAppDocs />
  }

  return (
    <AppVersionProvider
      key={appName}
      publishedQueryResult={data}
      appName={appName}
      appVersionFromUrl={appVersionFromUrl}>
      {children}
    </AppVersionProvider>
  )
}

interface AppVersionProviderProps {
  children: ReactNode
  publishedQueryResult: PublishedQueryResponse
  appName: string
  appVersionFromUrl: string
}

interface PublishedQueryResponse {
  appMajors: {
    latestMajor: string
    publishedMajors: string[]
  }
  appVersions: {
    latestStable: string
    publishedVersions: string[]
  }
}

export { EnhancedAppVersionProvider, useAppVersionState, useAppVersionDispatch }
