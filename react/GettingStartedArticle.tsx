import React, { Fragment, FunctionComponent } from 'react'
import { Query, compose, graphql } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { branch, renderComponent, renderNothing } from 'recompose'
import {
  Helmet,
  useRuntime,
  withRuntimeContext,
  NoSSR,
  Link,
} from 'vtex.render-runtime'

import Footer from './components/Footer'
import SideBar from './components/SideBar'
import DocsRenderer from './components/DocsRenderer'
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

  const currentArticle: number = Number.parseInt(
    useRuntime().route.params.article
  )

  return (
    <Fragment>
      <Helmet>
        <title>VTEX IO Docs</title>
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <main className="w-100 bg-base flex">
        <NoSSR>
          <div className="w-25-l min-h-100-l">
            <SideBar />
          </div>
        </NoSSR>
        <div className="pv9 w-80-l w-100 center flex flex-column">
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
                <Fragment>
                  <DocsRenderer markdown={markdown} meta={meta} />
                  <div className="flex justify-between w-75 ph9">
                    {hasPrevArticle(currentArticle) && (
                      <Link
                        className="link no-underline t-body"
                        to={`${currentArticle - 1}`}>
                        <span>Previous article</span>
                      </Link>
                    )}
                    {hasNextArticle(articles, currentArticle) && (
                      <Link
                        className="link no-underline t-body"
                        to={`${currentArticle + 1}`}>
                        <span>Next article</span>
                      </Link>
                    )}
                  </div>
                </Fragment>
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

function hasNextArticle(
  articleList: Record<string, string>,
  currentArticle: number
) {
  const numberOfArticles = Object.keys(articleList).length
  return currentArticle < numberOfArticles
}

function hasPrevArticle(currentArticle: number) {
  return currentArticle > 1
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
  }),
  branch(
    ({ GettingStartedArticlesQuery }: any) =>
      GettingStartedArticlesQuery.loading,
    renderNothing
  )
)(GettingStartedArticle)
