import React, { useContext, createContext, useReducer } from 'react'
import { useRuntime, withRuntimeContext } from 'vtex.render-runtime'
import { compose, graphql } from 'react-apollo'
import { renderComponent, branch } from 'recompose'

import Skeleton from './Skeleton'
import EmptyAppDocs from './EmptyAppDocs'

import * as appMajorsQuery from '../graphql/appMajors.graphql'

type Action =
  | { type: 'updateMajor'; value: string }
  | { type: 'updateAvailableMajors'; value: string[] }
type Dispatch = (action: Action) => void
interface State {
  major: string
  availableMajors: string[]
}

const AppVersionStateContext = createContext<State | undefined>(undefined)
const AppVersionDispatchContext = createContext<Dispatch | undefined>(undefined)

function appVersionReducer(state: State, action: Action) {
  switch (action.type) {
    case 'updateMajor': {
      return { major: action.value, availableMajors: state.availableMajors }
    }
    case 'updateAvailableMajors': {
      return { major: state.major, availableMajors: action.value }
    }
    default: {
      return state
    }
  }
}

function AppVersionProvider({ children, appMajorsQuery }: any) {
  const {
    route: { params },
  } = useRuntime()
  const urlVersion = params.app.split('@')[1]
  const hasVersion = !!urlVersion
  const majorFromQuery = `${appMajorsQuery.getAppMajors.latestMajor}.x`
  const availableMajors = appMajorsQuery.getAppMajors.publishedMajors

  const [versionInfo, dispatch] = useReducer(appVersionReducer, {
    major: `${hasVersion ? urlVersion : majorFromQuery}`,
    availableMajors,
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

const EnhancedAppVersionProvider = compose(
  withRuntimeContext,
  graphql(appMajorsQuery.default, {
    name: 'appMajorsQuery',
    options: (props: { runtime: any }) => {
      const [appName] = props.runtime.route.params.app.split('@')
      return {
        variables: {
          appName,
        },
      }
    },
  }),
  branch(
    ({ appMajorsQuery }: any) => appMajorsQuery.loading,
    renderComponent(Skeleton)
  ),
  branch(
    ({ appMajorsQuery }: any) => !!appMajorsQuery.error,
    renderComponent(EmptyAppDocs)
  )
)(AppVersionProvider)

export { EnhancedAppVersionProvider, useAppVersionState, useAppVersionDispatch }
