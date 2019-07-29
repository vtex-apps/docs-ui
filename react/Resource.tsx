import React, { Fragment, FunctionComponent } from 'react'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { Helmet, useRuntime } from 'vtex.render-runtime'

import Footer from './components/Footer'
import SideBar from './components/SideBar'
import DocsRenderer from './components/DocsRenderer'
import favicon from './images/favicon.png'
import Skeleton from './components/Skeleton'
import EmptyDocs from './components/EmptyDocs'

import * as MarkdownFile from './graphql/markdownFile.graphql'

const Resource: FunctionComponent = () => {
  const {
    route: { params },
  } = useRuntime()

  return (
    <Fragment>
      <Helmet>
        <title>VTEX IO Docs</title>
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <main className="w-100 bg-base flex">
        <div className="w-25-l min-h-100-l">
          <SideBar />
        </div>
        <div className="pv9 w-80-l w-100 center flex flex-column">
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

export default Resource
