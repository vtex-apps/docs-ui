import React, { FunctionComponent, useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { branch, renderComponent } from 'recompose'
import { Link, withRuntimeContext } from 'vtex.render-runtime'
import { IconCaretDown, IconCaretUp } from 'vtex.styleguide'

import Skeleton from './Skeleton'
import EmptySummary from './EmptySummary'

import * as Summary from '../graphql/getAppSummary.graphql'

interface Chapter {
  path: string
  title: string
  articles: Chapter[]
}

const SideBar: FunctionComponent<any> = ({ summaryQuery, runtime }) => {
  const {
    route: {
      params: { app },
    },
    query: { version, build },
  } = runtime

  return (
    <ul className="list pa6 pt10" role="menu">
      {getArticles(summaryQuery.getAppSummary.chapterList, app, version, build)}
    </ul>
  )
}

function getArticles(
  chapterList: Chapter[],
  app: string,
  version: string,
  build: string
): any {
  return chapterList.map((chapter: Chapter) => {
    const [open, setOpen] = useState(false)

    return (
      <li className="link" key={chapter.path}>
        <div className="flex justify-between items-center">
          {chapter.path ? (
            <Link
              to={`/docs/${app}/${chapter.path}${
                version ? `&version=${version}` : ''
              }`}>
              <p>{chapter.title}</p>
            </Link>
          ) : (
            <p>{chapter.title}</p>
          )}
          <div
            className="ph4"
            onClick={() => setOpen(!open)}
            onKeyPress={() => setOpen(!open)}
            role="menuitem"
            tabIndex={0}>
            {chapter.articles.length > 0 &&
              (open ? <IconCaretUp /> : <IconCaretDown />)}
          </div>
        </div>
        <div hidden={!open} className="pa3">
          {getArticles(chapter.articles, app, version, build)}
        </div>
      </li>
    )
  })
}

export default compose(
  withRuntimeContext,
  graphql(Summary.default, {
    name: 'summaryQuery',
    options: (props: { runtime: any }) => {
      const version = props.runtime.query.version
      const appName = `${props.runtime.route.params.app}${
        version ? `@${version}` : ''
      }`
      return {
        variables: {
          appName,
        },
      }
    },
  }),
  branch(
    ({ summaryQuery }: any) => summaryQuery.loading,
    renderComponent(Skeleton)
  ),
  branch(
    ({ summaryQuery }: any) => !!summaryQuery.error,
    renderComponent(EmptySummary)
  )
)(SideBar)
