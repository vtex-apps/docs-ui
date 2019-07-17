import React, { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { FormattedMessage } from 'react-intl'

import Skeleton from './Skeleton'
import EmptyDocs from './EmptyDocs'
import { helpRenderers } from './CustomTags'
import { useAppVersionState } from './AppVersionContext'
import { useAppNameAndFile } from '../hooks/useAppName'

import * as MarkdownFile from '../graphql/getMarkdownFile.graphql'

interface MetaData {
  title: string
  description: string
  tags: string[]
  version: string
  git: string
}

const DocsRenderer: FunctionComponent = () => {
  const { major } = useAppVersionState()
  const { appName, fileName } = useAppNameAndFile(major)

  return (
    <Query query={MarkdownFile.default} variables={{ appName, fileName }}>
      {({
        loading,
        error,
        data,
      }: {
        loading: boolean
        error?: ApolloError
        data: { getMarkdownFile: { markdown: string; meta: MetaData } }
      }) => {
        if (loading) return <Skeleton />
        if (error) return <EmptyDocs />

        const { markdown, meta } = data.getMarkdownFile

        if (markdown === '') return <EmptyDocs />

        return (
          <article className="ph9 w-100 min-vh-100">
            {meta.tags && <p>Tags: {meta.tags.toString()}</p>}
            <ReactMarkdown
              source={markdown}
              escapeHtml={false}
              renderers={helpRenderers}
            />
            {meta.git && (
              <a href={meta.git}>
                <FormattedMessage id="docs.docs-renderer.github" />
              </a>
            )}
          </article>
        )
      }}
    </Query>
  )
}

export default DocsRenderer
