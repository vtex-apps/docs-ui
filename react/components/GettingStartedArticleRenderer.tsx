import React, { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import { FormattedMessage } from 'react-intl'
import { Link, useRuntime } from 'vtex.render-runtime'

import { CustomRenderers } from './CustomTags'

const GettingStartedArticleRenderer: FunctionComponent<Props> = ({
  markdown,
  meta,
  articleList,
}) => {
  const currentArticle: number = Number.parseInt(
    useRuntime().route.params.article
  )

  return (
    <article className="ph9 w-100 min-vh-100">
      <ReactMarkdown
        source={markdown}
        escapeHtml={false}
        renderers={CustomRenderers}
      />
      {meta.git && (
        <a href={meta.git}>
          <FormattedMessage id="docs/renderer-github" />
        </a>
      )}
      <div className="flex justify-between w-75">
        {hasPrevArticle(currentArticle) && (
          <Link
            className="link no-underline t-body"
            to={`${currentArticle - 1}`}>
            <span>Previous article</span>
          </Link>
        )}
        {hasNextArticle(articleList, currentArticle) && (
          <Link
            className="link no-underline t-body"
            to={`${currentArticle + 1}`}>
            <span>Next article</span>
          </Link>
        )}
      </div>
    </article>
  )
}

interface MetaData {
  title: string
  description: string
  tags: string[]
  version: string
  git: string
}

interface Props {
  markdown: string
  meta: MetaData
  articleList: Record<string, string>
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

export default GettingStartedArticleRenderer
