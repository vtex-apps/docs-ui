import React, { FunctionComponent } from 'react'
import remark from 'remark'
import remark2react from 'remark-react'
import { graphql, compose } from 'react-apollo'
import { branch, renderComponent } from 'recompose'
import { withRuntimeContext } from 'vtex.render-runtime'

import Skeleton from './Skeleton'
import EmptyDocs from './EmptyDocs'
import { remarkReactComponents } from './CustomTags'

import * as MarkdownFile from '../graphql/getMarkdownFile.graphql'

interface MetaData {
  title: string
  description: string
  tags: string[]
  version: string
  git: string
}

const DocsRenderer: FunctionComponent<any> = ({ markdownQuery }) => {
  const { meta, markdown }: { meta: MetaData, markdown: string } = markdownQuery.getMarkdownFile

  return (
    <article className="ph9 w-100">
      {meta.tags && <p>Tags: {meta.tags.toString()}</p>}
      {
        remark()
          .use(remark2react, {
            remarkReactComponents,
          })
          .processSync(markdown).contents
      }
      {meta.git && <p>Edit this page on <a href={meta.git}>GitHub</a></p>}
    </article>
  )
}

export default compose(
  withRuntimeContext,
  graphql(MarkdownFile.default, {
    name: 'markdownQuery',
    options: (props: { runtime: any }) => {
      const { app, file } = props.runtime.route.params
      const fileName = file || 'README.md'
      const version = props.runtime.query.version
      const appName = `${app}${version ? `@${version}` : ''}`
      return {
        variables: {
          appName,
          fileName,
        },
      }
    },
  }),
  branch(
    ({ markdownQuery }: any) => markdownQuery.loading,
    renderComponent(Skeleton)
  ),
  branch(
    ({ markdownQuery }: any) => !!markdownQuery.error,
    renderComponent(EmptyDocs)
  )
)(DocsRenderer)
