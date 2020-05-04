import React, { useContext, createContext, useReducer, ReactNode } from 'react'
import { ApolloError } from 'apollo-client'
import { branch, compose, renderComponent } from 'recompose'
import { graphql } from 'react-apollo'

import { IO_DOCUMENTATION } from '../modules/constantExports'
import Skeleton from './Skeleton'
import EmptySummary from './EmptySummary'
import Summary from '../graphql/appSummary.graphql'

interface Action {
  type: 'updateContent'
  value: Chapter[]
}
type Dispatch = (action: Action) => void
interface State {
  content: Chapter[]
}

interface Chapter {
  title: string
  path?: string
  articles: [] | Chapter[]
}

const SideBarStateContext = createContext<State | undefined>(undefined)
const SideBarDispatchContext = createContext<Dispatch | undefined>(undefined)

const DEFAULT_LOCALE = 'en'

function SideBarContentReducer(state: State, action: Action) {
  switch (action.type) {
    case 'updateContent': {
      return { ...state, major: action.value }
    }
    default: {
      return state
    }
  }
}

function SideBarContentProvider({
  children,
  appSummaryQuery,
}: SideBarContentProviderProps) {
  const [sideBarContent, dispatch] = useReducer(SideBarContentReducer, {
    content: appSummaryQuery.appSummary.chapterList,
  })

  return (
    <SideBarStateContext.Provider value={sideBarContent}>
      <SideBarDispatchContext.Provider value={dispatch}>
        {children}
      </SideBarDispatchContext.Provider>
    </SideBarStateContext.Provider>
  )
}

function useSideBarContentState() {
  const context = useContext(SideBarStateContext)
  if (context === undefined) {
    throw new Error(
      'useSideBarContentState must be used within a SideBarContentProvider'
    )
  }
  return context
}

function useSideBarContentDispatch() {
  const context = useContext(SideBarDispatchContext)

  if (context === undefined) {
    throw new Error(
      'useAppVersionDispatch must be used within a SideBarContentProvider'
    )
  }
  return context
}

const EnhancedSideBarContentProvider = compose<any, any>(
  graphql(Summary, {
    name: 'appSummaryQuery',
    options: {
      variables: {
        appName: IO_DOCUMENTATION,
        locale: DEFAULT_LOCALE,
      },
    },
  }),
  branch(
    ({ appSummaryQuery }: OuterProps) => appSummaryQuery.loading,
    renderComponent(Skeleton)
  ),
  branch(
    ({ appSummaryQuery }: OuterProps) => !!appSummaryQuery.error,
    renderComponent(EmptySummary)
  )
)(SideBarContentProvider)

interface SideBarContentProviderProps {
  children: ReactNode
  appSummaryQuery: AppSummaryQueryResponse
}

interface AppSummaryQueryResponse {
  appSummary: {
    chapterList: Chapter[]
  }
}

interface OuterProps {
  appSummaryQuery: {
    data: AppSummaryQueryResponse
    loading: boolean
    error?: ApolloError
  }
}

export {
  EnhancedSideBarContentProvider,
  useSideBarContentState,
  useSideBarContentDispatch,
}
