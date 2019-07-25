import React, { ReactElement, FunctionComponent } from 'react'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'

import SideBarItem from './SideBarItem'
import Skeleton from './Skeleton'
import EmptySummary from './EmptySummary'
import { useAppNameAndFile } from '../hooks/useAppName'

import VTEXBlack from './icons/VTEXBlack'

import * as Summary from '../graphql/appSummary.graphql'

interface Chapter {
  title: string
  path: string
  articles: [] | Chapter[]
}

const SideBar: FunctionComponent = () => {
  const appName = useAppNameAndFile().appName || 'vtex.io-documentation@0.x'

  return (
    <Query query={Summary.default} variables={{ appName }}>
      {({
        loading,
        error,
        data,
      }: {
        loading: boolean
        error?: ApolloError
        data: { appSummary: { chapterList: Chapter[] } }
      }) => {
        if (loading) return <Skeleton />
        if (error) return <EmptySummary />

        return (
          <nav className="min-h-100 br b--muted-4">
            <VTEXBlack />
            {getArticles(data.appSummary.chapterList, 0, appName)}
          </nav>
        )
      }}
    </Query>
  )
}

function getArticles(
  chapterList: Chapter[],
  depth: number,
  app?: string
): ReactElement {
  return (
    <div className={`list ${depth > 0 ? 'pl0 pr2 pt5 pb5' : 'pa7'}`}>
      {chapterList.map((chapter: Chapter) => (
        <SideBarItem
          appName={app}
          text={chapter.title}
          link={chapter.path}
          hasArticles={chapter.articles.length > 0}
          key={chapter.title}
          depth={depth}>
          {getArticles(chapter.articles, depth + 1, app)}
        </SideBarItem>
      ))}
    </div>
  )
}

export default SideBar
