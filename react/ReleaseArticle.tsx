import React, { FC } from 'react'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { useRuntime } from 'vtex.render-runtime'

import DocsRenderer from './components/DocsRenderer'
import Skeleton from './components/Skeleton'
import EmptyDocs from './components/EmptyDocs'
import { maybeAddMdExtension } from './modules'
import MarkdownFile from './graphql/markdownFile.graphql'

const ReleaseArticle: FC = () => {
  const {
    route: { params },
  } = useRuntime()

  return (
    <div className="w-100 center flex flex-column">
      <Query
        query={MarkdownFile}
        variables={{
          appName: 'vtex.io-release-notes@0.x',
          fileName: `${params.week}/${maybeAddMdExtension(params.article)}`,
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
  )
}

interface MetaData {
  title: string
  description: string
  tags: string[]
  version: string
  git: string
}

export default ReleaseArticle
