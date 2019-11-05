import React, { Fragment, FC } from 'react'
import { Query, compose, graphql } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { branch, renderComponent } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { withRuntimeContext, Link, InjectedRuntime } from 'vtex.render-runtime'
import { APP_NAME } from './utils/constants'
import DocsRenderer from './components/DocsRenderer'
import Skeleton from './components/Skeleton'
import EmptyDocs from './components/EmptyDocs'

import MarkdownFile from './graphql/markdownFile.graphql'
import GettingStartedArticles from './graphql/gettingStartedArticles.graphql'
import RightArrow from './components/icons/RightArrow'
import LeftArrow from './components/icons/LeftArrow'

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
          appName: APP_NAME,
          fileName: `GettingStarted/${track}/${articles[article]}`,
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

          return (
            <Fragment>
              <DocsRenderer markdown={markdown} meta={meta} />
              <div className="flex w-100-l w-90 center justify-between mt6">
                {hasPrevArticle(currentArticle) && (
                  <Link
                    className="link c-emphasis no-underline t-body mr-auto flex items-center dim"
                    to={`${currentArticle - 1}`}>
                    <div className="flex flex-column flex-row-l">
                      <div className="mr5">
                        <LeftArrow />
                      </div>
                      <span className="dn db-l">
                        <FormattedMessage id="docs/getting-started.previous" />
                      </span>
                    </div>
                  </Link>
                )}
                {hasNextArticle(articles, currentArticle) && (
                  <Link
                    className="link c-emphasis no-underline t-body ml-auto flex items-center dim"
                    to={`${currentArticle + 1}`}>
                    <div className="flex flex-column flex-row-l">
                      <span className="dn db-l">
                        <FormattedMessage id="docs/getting-started.next" />
                      </span>
                      <div className="ml5">
                        <RightArrow />
                      </div>
                    </div>
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
          locale: 'en',
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
