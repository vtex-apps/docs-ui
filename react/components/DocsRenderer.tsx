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

const DocsRenderer: FunctionComponent<any> = ({ markdownQuery }) => {
  const { metaData, markdown } = markdownQuery.getMarkdownFile

  return (
    <article className="pa7 w-100">
      {
        remark()
          .use(remark2react, {
            remarkReactComponents: {
              ...remarkReactComponents,
              img: ({ src }: { src: string }) => {
                return src[0] === '/' ? (
                  <img
                    src={`https://raw.githubusercontent.com/${
                      metaData.git
                      }/master${src}`}
                  />
                ) : (
                    <img src={src} />
                  )
              },
            },
          })
          .processSync(markdown).contents
      }
    </article>
  )
}

export default compose(
  withRuntimeContext,
  graphql(MarkdownFile.default, {
    name: 'markdownQuery',
    options: (props: { runtime: any }) => {
      const appName = props.runtime.route.params.app
      const fileName = props.runtime.query.file
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
