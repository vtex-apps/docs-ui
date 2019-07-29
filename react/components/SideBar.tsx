import React, { ReactElement, FunctionComponent } from 'react'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'

import SideBarItem from './SideBarItem'
import Skeleton from './Skeleton'
import EmptySummary from './EmptySummary'
import { useAppNameAndFile } from '../hooks/useAppName'
import { Drawer } from 'vtex.store-drawer'
import { Link, useRuntime } from 'vtex.render-runtime'

import VTEXBlack from './icons/VTEXBlack'
import * as Summary from '../graphql/appSummary.graphql'

interface Chapter {
  title: string
  path: string
  articles: [] | Chapter[]
}

const SideBar: FunctionComponent = () => {
  const appName = useAppNameAndFile().appName || 'vtex.io-documentation@0.x'
  const { hints } = useRuntime()

  return (
    <Query query={Summary.default} variables={{ appName, locale: 'en' }}>
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

        return hints.mobile ? (
          <nav className="flex w-100 items-center fixed bg-base z-2">
            <div className="w-50 pl4">
              <Drawer>
                <div className="flex flex-column w-90 center">
                  {getArticles(data.appSummary.chapterList, 0, appName)}
                </div>
              </Drawer>
            </div>
            <div className="w-100 center">
              <Link to="/docs/home">
                <VTEXBlack />
              </Link>
            </div>
          </nav>
        ) : (
          <nav className="min-h-100 br b--muted-4">
            <Link to="/docs/home" className="pl5">
              <VTEXBlack />
            </Link>
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
    <div className={`list ${depth > 0 ? 'pl0-l pr2-l pt5 pb5' : 'pa7-l'}`}>
      {chapterList.map((chapter: Chapter) => (
        <SideBarItem
          appName={app}
          text={chapter.title}
          link={chapter.path && removeFileExtension(chapter.path)}
          hasArticles={chapter.articles.length > 0}
          key={chapter.title}
          depth={depth}>
          {getArticles(chapter.articles, depth + 1, app)}
        </SideBarItem>
      ))}
    </div>
  )
}

function removeFileExtension(fileName: string) {
  const MARKDOWN_EXTENSION = '.md'
  return fileName.endsWith(MARKDOWN_EXTENSION)
    ? fileName.substring(0, fileName.length - MARKDOWN_EXTENSION.length)
    : fileName
}

export default SideBar
