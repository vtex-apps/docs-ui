import React, { Fragment, FC } from 'react'
import { Query, graphql } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { compose, renderNothing, branch } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { withRuntimeContext, Link, InjectedRuntime } from 'vtex.render-runtime'

import { IO_DOCUMENTATION } from './modules/constantExports'
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

  const currentArticle = Number.parseInt(article, 10)

  return (
    <div className="w-100 center flex flex-column">
      <Query
        query={MarkdownFile}
        variables={{
          appName: IO_DOCUMENTATION,
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
              <div
                className="flex w-100 justify-between mv6"
                style={{ maxWidth: '680px' }}>
                {hasPrevArticle(currentArticle) && (
                  <Link
                    className="link c-emphasis no-underline t-body mr-auto flex items-center dim"
                    page="docs-ui.getting-started"
                    params={{
                      track,
                      article: `${currentArticle - 1}`,
                    }}>
                    <div className="flex flex-column flex-row-l">
                      <div className="dn db-l mr5">
                        <LeftArrow />
                      </div>
                      <FormattedMessage id="docs-ui/getting-started.previous" />
                    </div>
                  </Link>
                )}
                {hasNextArticle(articles, currentArticle) && (
                  <Link
                    className="link c-emphasis no-underline t-body ml-auto flex items-center dim"
                    page="docs-ui.getting-started"
                    params={{
                      track,
                      article: `${currentArticle + 1}`,
                    }}>
                    <div className="flex flex-column flex-row-l">
                      <FormattedMessage id="docs-ui/getting-started.next" />
                      <div className="dn db-l ml5">
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

export default compose<any, any>(
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
    renderNothing
  )
)(GettingStartedArticle)
