import React, { FunctionComponent } from 'react'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { useRuntime } from 'vtex.render-runtime'

import DocsRenderer from './components/DocsRenderer'
import Skeleton from './components/Skeleton'
import EmptyDocs from './components/EmptyDocs'

import * as MarkdownFile from './graphql/markdownFile.graphql'
import PageLayoutContainer from './components/PageLayoutContainer'

const Resource: FunctionComponent = () => {
  const {
    route: { params },
  } = useRuntime()

  return (
    <PageLayoutContainer>
      <div className="pv9 w-90-l w-100 center flex flex-column">
        <Query
          query={MarkdownFile.default}
          variables={{
            appName: 'vtex.io-documentation@0.x',
            fileName: `Resources/${params.resource}.md`,
            locale: 'en',
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
    </PageLayoutContainer>
  )
}

interface MetaData {
  title: string
  description: string
  tags: string[]
  version: string
  git: string
}

export default Resource
