import React, { FC } from 'react'
import { Query, compose, graphql } from 'react-apollo'
import { branch, renderComponent } from 'recompose'
import { ApolloError } from 'apollo-client'
import { withRuntimeContext } from 'vtex.render-runtime'

import DocsRenderer from './components/DocsRenderer'
import Skeleton from './components/Skeleton'
import EmptyDocs from './components/EmptyDocs'

import * as MarkdownFile from './graphql/markdownFile.graphql'
import * as AppMajors from './graphql/appMajors.graphql'

const ComponentDocs: FC<any> = ({ AppMajorsQuery, runtime }) => {
  const { appName, fileName } = getComponentAndFileName(
    AppMajorsQuery.appMajors.latestMajor,
    runtime.route.params
  )

  return (
    <div className="pv9 w-100 center flex flex-column">
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
          if (error || data.markdownFile.markdown === '') return <EmptyDocs />

          const {
            markdownFile: { markdown, meta },
          } = data

          return <DocsRenderer markdown={markdown} meta={meta} />
        }}
      </Query>
    </div>
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
  branch(
    ({ AppMajorsQuery }: any) => AppMajorsQuery.loading,
    renderComponent(Skeleton)
  ),
  branch(
    ({ AppMajorsQuery }: any) => !!AppMajorsQuery.error,
    renderComponent(EmptyDocs)
  )
)(ComponentDocs)
