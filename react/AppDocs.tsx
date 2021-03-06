import React, { FC } from 'react'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'

import DocsRenderer from './components/DocsRenderer'
import Skeleton from './components/Skeleton'
import EmptyDocs from './components/EmptyDocs'
import { useApp } from './hooks/useApp'
import { maybeAddMdExtension } from './modules'
import MarkdownFile from './graphql/markdownFile.graphql'

const AppDocs: FC = () => {
  const { appName, fileName } = useApp()

  return (
    <div className="w-100 center flex flex-column">
      <Query
        query={MarkdownFile}
        variables={{
          appName,
          fileName: maybeAddMdExtension(fileName),
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

export default AppDocs
