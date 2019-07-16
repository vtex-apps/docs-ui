import React, { FunctionComponent } from 'react'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { useRuntime } from 'vtex.render-runtime'

import { useAppVersionState } from './AppVersionContext'
import Skeleton from './Skeleton'
import EmptySummary from './EmptySummary'
import SideBarItem from './SideBarItem'

import * as Summary from '../graphql/getAppSummary.graphql'

interface Chapter {
  path: string
  title: string
  articles: Chapter[]
}

const SideBar: FunctionComponent<any> = () => {
  const { major } = useAppVersionState()
  const {
    route: { params },
  } = useRuntime()
  const { app } = params
  const [appName] = app.split('@')

  const finalAppName = `${appName}@${major}.x`

  return (
    <Query query={Summary.default} variables={{ appName: finalAppName }}>
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
            {getArticles(data.getAppSummary.chapterList, appName, major)}
          </ul>
        )
      }}
    </Query>
  )
}

function getArticles(
  chapterList: Chapter[],
  app: string,
  version: string
): any {
  return chapterList.map((chapter: Chapter) => (
    <SideBarItem
      appName={app}
      text={chapter.title}
      link={chapter.path}
      hasArticles={chapter.articles.length > 0}
      key={app}>
      {getArticles(chapter.articles, app, version)}
    </SideBarItem>
  ))
}

export default SideBar
