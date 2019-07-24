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

import * as MarkdownFile from './graphql/getMarkdownFile.graphql'

const Recipe: FunctionComponent = () => {
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
        <div className="w-25 min-h-100">
          <SideBar />
        </div>
        <div className="pv10 w-80-l w-90 center flex flex-column">
          <Query
            query={MarkdownFile.default}
            variables={{
              appName: 'vtex.io-documentation@0.x',
              fileName: `Recipes/${params.category}/${params.recipe}.md`,
            }}>
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

              const {
                getMarkdownFile: { markdown, meta },
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

export default Recipe
