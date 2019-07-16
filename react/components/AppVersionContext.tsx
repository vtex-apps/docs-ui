import React, { useState, useContext, createContext, Fragment } from 'react'
import { useRuntime, withRuntimeContext } from 'vtex.render-runtime'
import { compose, graphql } from 'react-apollo'
import { renderComponent, branch, renderNothing } from 'recompose'

import Skeleton from './Skeleton'
import EmptyAppDocs from './EmptyAppDocs'

import * as appMajorsQuery from '../graphql/getAppMajors.graphql'

type Dispatch = (newMajorInfo: {
  major: string
  availableMajors: string[]
}) => void
interface State {
  major: string
  availableMajors: string[]
}

const AppVersionStateContext = createContext<State | undefined>(undefined)
const AppVersionDispatchContext = createContext<Dispatch | undefined>(undefined)

function AppVersionProvider({ children, appMajorsQuery }: any) {
  const { loading, error } = appMajorsQuery

  const {
    route: { params },
  } = useRuntime()
  const urlVersion = params.app.split('@')[1]
  const hasVersion = !!urlVersion
  const majorFromQuery = loading
    ? ''
    : `${appMajorsQuery.getAppMajors.latestMajor}.x`
  const availableMajors = loading
    ? ['']
    : appMajorsQuery.getAppMajors.publishedMajors

  const [versionInfo, setVersionInfo] = useState({
    major: `${hasVersion ? urlVersion : majorFromQuery}`,
    availableMajors,
  })

  return (
    <AppVersionStateContext.Provider value={versionInfo}>
      <AppVersionDispatchContext.Provider value={setVersionInfo}>
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
