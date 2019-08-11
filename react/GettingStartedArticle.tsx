import React, { Fragment, FC } from 'react'
import { Query, compose, graphql } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { branch, renderComponent } from 'recompose'
import { withRuntimeContext, Link, InjectedRuntime } from 'vtex.render-runtime'

import DocsRenderer from './components/DocsRenderer'
import Skeleton from './components/Skeleton'
import EmptyDocs from './components/EmptyDocs'

import MarkdownFile from './graphql/markdownFile.graphql'
import GettingStartedArticles from './graphql/gettingStartedArticles.graphql'

const GettingStartedArticle: FC<OuterProps & InjectedRuntime> = ({
  GettingStartedArticlesQuery,
  runtime,
}) => {
  const {
    route: {
      params: { track, article },
    },
  } = runtime

  const articles = GettingStartedArticlesQuery.gettingStartedArticles

  const currentArticle = Number.parseInt(article)

  return (
    <div className="pv9 w-100 center flex flex-column">
      <Query
        query={MarkdownFile}
        variables={{
          appName: 'vtex.io-documentation@0.x',
          fileName: `GettingStarted/${track}/${articles[article]}`,
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
              <div className="flex w-80-l center justify-between">
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
  )
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

interface OuterProps {
  GettingStartedArticlesQuery: {
    gettingStartedArticles: Record<string, string>
    loading: boolean
    error?: ApolloError
  }
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
  graphql(GettingStartedArticles, {
    name: 'GettingStartedArticlesQuery',
    options: (props: InjectedRuntime) => {
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
    ({ GettingStartedArticlesQuery }: OuterProps) =>
      GettingStartedArticlesQuery.loading,
    renderComponent(Skeleton)
  )
)(GettingStartedArticle)
