import React, { FunctionComponent, useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { branch, renderComponent } from 'recompose'
import { Link, withRuntimeContext } from 'vtex.render-runtime'
import { IconCaretDown, IconCaretUp } from 'vtex.styleguide'

import Skeleton from './Skeleton'
import EmptySummary from './EmptySummary'

import * as Summary from '../graphql/getAppSummary.graphql'

const SideBar: FunctionComponent<any> = ({ summaryQuery, runtime }) => {

  const { route: { params: { app } }, query: { version, build } } = runtime
  const [open, setOpen] = useState(false)

  return (
    <ul className="pa7 mt0 list br b--muted-5">
      {summaryQuery.getAppSummary.chapterList.map((appItem: any) => (
        <li className="pv3 link" key={appItem.urlName}>
          <div className="flex justify-between items-center">
            {appItem.path ?
              <Link to={`/docs/${app}?file=${appItem.path}${version ? `&version=${version}` : ''}${build ? `&build=${build}` : ''}`}>
                {appItem.title}
              </Link> : <p>{appItem.title}</p>
            }
            <div className="ph4" onClick={() => setOpen(!open)}>
              {appItem.articles.length > 0 && (open ? <IconCaretUp /> : <IconCaretDown />)}
            </div>
          </div>
          <div hidden={!open}>
            {appItem.articles.length > 0 && appItem.articles.map((article: any) => (
              <li className="ph4 pv3 link">
                <Link to={`/docs/${app}?file=${article.path}${version ? `&version=${version}` : ''}${build ? `&build=${build}` : ''}`}>
                  {article.title}
                </Link>
              </li>
            ))}
          </div>
        </li>
      ))}
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
