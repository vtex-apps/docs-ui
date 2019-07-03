import React, { FunctionComponent, useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { branch, renderComponent } from 'recompose'
import { Link, useRuntime } from 'vtex.render-runtime'
import { IconCaretDown, IconCaretUp } from 'vtex.styleguide'

import Skeleton from './Skeleton'

import * as Summary from '../graphql/getAppSummary.graphql'

const SideBar: FunctionComponent<any> = ({ summaryQuery }) => {

  const { query } = useRuntime()
  const [open, setOpen] = useState(false)

  return (
    <ul className="pa7 mt0 list br b--muted-5">
      {summaryQuery.getAppSummary.chapterList.map((app: any) => (
        <li className="pv3 link" key={app.urlName}>
          <div className="flex justify-between items-center">
            {app.path ?
              <Link to={`/docs?app=${query.app}&filePath=${app.path}`}>
                {app.title}
              </Link> : <p>{app.title}</p>
            }
            <div className="ph4" onClick={() => setOpen(!open)}>
              {app.articles.length > 0 && (open ? <IconCaretUp /> : <IconCaretDown />)}
            </div>
          </div>
          <div hidden={!open}>
            {app.articles.length > 0 && app.articles.map((article: any) => (
              <li className="ph4 pv3 link">
                <Link to={`/docs?app=${query.app}&filePath=${article.path}`}>
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
  graphql(Summary.default, {
    name: 'summaryQuery',
    options: () => {
      const params = new URLSearchParams(location.search)
      const appName = params.get('app')
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
)(SideBar)
