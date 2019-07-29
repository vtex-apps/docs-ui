import React, { Fragment, FunctionComponent } from 'react'
import { Query, compose, graphql } from 'react-apollo'
import { branch, renderComponent, renderNothing } from 'recompose'
import { ApolloError } from 'apollo-client'
import { Helmet, withRuntimeContext, NoSSR } from 'vtex.render-runtime'

import Footer from './components/Footer'
import SideBar from './components/SideBar'
import DocsRenderer from './components/DocsRenderer'
import favicon from './images/favicon.png'
import Skeleton from './components/Skeleton'
import EmptyDocs from './components/EmptyDocs'

import * as MarkdownFile from './graphql/markdownFile.graphql'
import * as AppMajors from './graphql/appMajors.graphql'

const ComponentDocs: FunctionComponent<any> = ({ AppMajorsQuery, runtime }) => {
  const { appName, fileName } = getComponentAndFileName(
    AppMajorsQuery.appMajors.latestMajor,
    runtime.route.params
  )

  return (
    <Fragment>
      <Helmet>
        <title>VTEX IO Docs</title>
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <main className="w-100 bg-base flex">
        <NoSSR>
          <div className="w-25-l min-h-100-l">
            <SideBar />
          </div>
        </NoSSR>
        <div className="pv9 w-80-l w-100 center flex flex-column">
          <Query
            query={MarkdownFile.default}
            variables={{
              appName,
              fileName: `${fileName}.md`,
            }}>
            {({
              loading,
              error,
              data,
            }: {
              loading: boolean
              error?: ApolloError
              data: { markdownFile: { markdown: string; meta: MetaData } }
            }) => {
              if (loading) return <Skeleton />
              if (error) return <EmptyDocs />

              const {
                markdownFile: { markdown, meta },
              } = data

              return <DocsRenderer markdown={markdown} meta={meta} />
            }}
          </Query>
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

interface MetaData {
  title: string
  description: string
  tags: string[]
  version: string
  git: string
}

function getComponentAndFileName(
  major: number,
  params: { component: string; file: string }
) {
  const { component, file } = params
  const fileName = file || 'README'
  const hasVersionInUrl = !!component.split('@')[1]

  const finalAppName = hasVersionInUrl ? component : `${component}@${major}.x`

  return { appName: finalAppName, fileName }
}

export default compose(
  withRuntimeContext,
  graphql(AppMajors.default, {
    name: 'AppMajorsQuery',
    options: (props: { runtime: any }) => ({
      variables: {
        appName: props.runtime.route.params.component,
      },
    }),
  }),
  branch(({ AppMajorsQuery }: any) => AppMajorsQuery.loading, renderNothing),
  branch(
    ({ AppMajorsQuery }: any) => !!AppMajorsQuery.error,
    renderComponent(EmptyDocs)
  )
)(ComponentDocs)
