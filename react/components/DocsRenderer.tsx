import React, { FC, Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import emoji from 'remark-emoji'
import { FormattedMessage } from 'react-intl'

import { CustomRenderers } from './CustomTags'
import EmptyDocs from './EmptyDocs'
import { Helmet } from 'vtex.render-runtime'

const DocsRenderer: FC<Props> = ({ markdown, meta }) => {
  const isEmptyDocs = markdown === ''

  if (isEmptyDocs) {
    return <EmptyDocs />
  }

  const title = markdown
    .split('# ')[1] // everything after the #
    .split('\n')[0] // Only the headline
    .trim()

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <article className="min-vh-100">
        <ReactMarkdown
          source={markdown}
          escapeHtml={false}
          renderers={CustomRenderers}
          plugins={[emoji]}
        />
        {meta.git && (
          <a href={meta.git} className="c-emphasis no-underline dim flex mb6">
            <FormattedMessage id="docs/renderer-github" />
          </a>
        )}
      </article>
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

interface Props {
  markdown: string
  meta: MetaData
}

export default DocsRenderer
