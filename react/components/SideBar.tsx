import React, { FunctionComponent } from 'react'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'

import Skeleton from './Skeleton'
import EmptySummary from './EmptySummary'
import SideBarItem from './SideBarItem'
import { useAppVersionState } from './AppVersionContext'
import { useAppNameAndFile } from '../hooks/useAppName'

import * as Summary from '../graphql/getAppSummary.graphql'

interface Chapter {
  path: string
  title: string
  articles: Chapter[]
}

let articleDepth = 0

const SideBar: FunctionComponent = () => {
  const { major } = useAppVersionState()
  const { appName } = useAppNameAndFile(major)

  return (
    <Query query={Summary.default} variables={{ appName }}>
      {({
        loading,
        error,
        data,
      }: {
        loading: boolean
        error?: ApolloError
        data: { getAppSummary: { chapterList: Chapter[] } }
      }) => {
        if (loading) return <Skeleton />
        if (error) return <EmptySummary />

        return (
          <ul className="list pa6 pt10" role="menu">
            {getArticles(
              data.getAppSummary.chapterList,
              appName,
              major,
              articleDepth
            )}
          </ul>
        )
      }}
    </Query>
  )
}

function getArticles(
  chapterList: Chapter[],
  app: string,
  version: string,
  depth: number
): any {
  return chapterList.map((chapter: Chapter) => (
    <SideBarItem
      appName={app}
      text={chapter.title}
      link={chapter.path}
      hasArticles={chapter.articles.length > 0}
      key={app}
      depth={depth}>
      {getArticles(chapter.articles, app, version, depth + 1)}
    </SideBarItem>
  ))
}

export default SideBar
