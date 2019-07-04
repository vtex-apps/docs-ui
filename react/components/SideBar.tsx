import React, { FunctionComponent, useState, ReactNode } from 'react'
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

const getArticles: any = (chapterList: Chapter[], app: string, version: string, build: string) => {
  return chapterList.map((chapter: Chapter) => {
    const [open, setOpen] = useState(false)

    return (
      <li className="pv3 link" key={chapter.path}>
        <div className="flex justify-between items-center">
          {chapter.path ?
            <Link to={`/docs/${app}?file=${chapter.path}${version ? `&version=${version}` : ''}${build ? `&build=${build}` : ''}`}>
              {chapter.title}
            </Link> : <p>{chapter.title}</p>
          }
          <div className="ph4" onClick={() => setOpen(!open)}>
            {chapter.articles.length > 0 && (open ? <IconCaretUp /> : <IconCaretDown />)}
          </div>
        </div>
        <div hidden={!open} className="pa3">
          {getArticles(chapter.articles, app, version, build)}
        </div>
      </li>
    )
  })
}

const SideBar: FunctionComponent<any> = ({ summaryQuery, runtime }) => {

  const { route: { params: { app } }, query: { version, build } } = runtime

  return (
    <ul className="pa7 mt0 list br b--muted-5">
      {getArticles(summaryQuery.getAppSummary.chapterList, app, version, build)}
    </ul>
  )
}

export default compose(
  withRuntimeContext,
  graphql(Summary.default, {
    name: 'summaryQuery',
    options: (props: { runtime: any }) => {
      const version = props.runtime.query.version
      const buildNumber = props.runtime.query.build
      const appName = `${props.runtime.route.params.app}${version ? `@${version}` : ''}${buildNumber ? `+${buildNumber}` : ''}`
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
