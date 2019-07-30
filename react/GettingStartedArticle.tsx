import React, { Fragment, FC } from 'react'
import { Query, compose, graphql } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { branch, renderNothing } from 'recompose'
import { useRuntime, withRuntimeContext, Link } from 'vtex.render-runtime'

import DocsRenderer from './components/DocsRenderer'
import Skeleton from './components/Skeleton'
import EmptyDocs from './components/EmptyDocs'
import PageLayoutContainer from './components/PageLayoutContainer'

import * as MarkdownFile from './graphql/markdownFile.graphql'
import * as GettingStartedArticles from './graphql/gettingStartedArticles.graphql'

const GettingStartedArticle: FC = ({ GettingStartedArticlesQuery }: any) => {
  const {
    route: { params },
  } = useRuntime()

  const articles = GettingStartedArticlesQuery.gettingStartedArticles

  const currentArticle: number = Number.parseInt(
    useRuntime().route.params.article
  )

  return (
    <PageLayoutContainer>
      <div className="pv9 w-90-l w-100 center flex flex-column">
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
                <div className="flex justify-between">
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
    </PageLayoutContainer>
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
