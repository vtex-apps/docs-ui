import React, { Fragment, FunctionComponent } from 'react'
import { Query, compose, graphql } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { Helmet, useRuntime, withRuntimeContext } from 'vtex.render-runtime'

import Footer from './components/Footer'
import SideBar from './components/SideBar'
import GettingStartedArticlesRenderer from './components/GettingStartedArticlesRenderer'
import favicon from './images/favicon.png'
import Skeleton from './components/Skeleton'
import EmptyDocs from './components/EmptyDocs'

import * as MarkdownFile from './graphql/markdownFile.graphql'
import * as GettingStartedArticles from './graphql/gettingStartedArticles.graphql'

const GettingStartedArticle: FunctionComponent = ({
  GettingStartedArticlesQuery,
}: any) => {
  const {
    route: { params },
  } = useRuntime()

  const articles = GettingStartedArticlesQuery.gettingStartedArticles

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
        <div className="pv9 w-80-l w-90 center flex flex-column">
          <Query
            query={MarkdownFile.default}
            variables={{
              appName: 'vtex.io-documentation@0.x',
              fileName: `GettingStarted/${params.track}/${
                articles[params.article]
              }`,
              locale: 'pt',
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

              return (
                <GettingStartedArticlesRenderer
                  markdown={markdown}
                  meta={meta}
                  articleList={articles}
                />
              )
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

export default compose(
  withRuntimeContext,
  graphql(GettingStartedArticles.default, {
    name: 'GettingStartedArticlesQuery',
    options: (props: { runtime: any }) => {
      const { track } = props.runtime.route.params
      return {
        variables: {
          track,
          locale: 'pt',
        },
      }
    },
  })
)(GettingStartedArticle)
