import React, { FunctionComponent } from 'react'
import remark from 'remark'
import remark2react from 'remark-react'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { useRuntime } from 'vtex.render-runtime'

import Skeleton from './Skeleton'
import EmptyDocs from './EmptyDocs'
import { remarkReactComponents } from './CustomTags'
import { useAppVersionState } from './AppVersionContext'

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
  const {
    route: { params },
  } = useRuntime()
  const { app, file } = params
  const [appName] = app.split('@')
  const fileName = file || 'README.md'

  const finalAppName = `${appName}@${major}.x`

  return (
    <Query
      query={MarkdownFile.default}
      variables={{ appName: finalAppName, fileName }}>
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
            {
              remark()
                .use(remark2react, {
                  remarkReactComponents,
                })
                .processSync(markdown).contents
            }
            {meta.git && (
              <p>
                Edit this page on <a href={meta.git}>GitHub</a>
              </p>
            )}
          </article>
        )
      }}
    </Query>
  )
}

export default DocsRenderer
