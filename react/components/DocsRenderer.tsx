import React, { FC, Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import emoji from 'remark-emoji'
import { FormattedMessage } from 'react-intl'

import { CustomRenderers } from './CustomTags'
import EmptyDocs from './EmptyDocs'
import { Helmet } from 'vtex.render-runtime'

const DocsRenderer: FC<Props> = ({ markdown, meta }) => {
  const isEmptyDocs = markdown === ''
  const title = markdown
    .split('\n')[0]
    .replace('#', '')
    .trim()
  return !isEmptyDocs ? (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <article className="ph0-l ph5 w-100-l w-90 min-vh-100">
        <ReactMarkdown
          source={markdown}
          escapeHtml={false}
          renderers={CustomRenderers}
          plugins={[emoji]}
        />
        {meta.git && (
          <a href={meta.git} className="c-emphasis no-underline dim flex mt8">
            <FormattedMessage id="docs/renderer-github" />
          </a>
        )}
      </article>
    </Fragment>
  ) : (
    <EmptyDocs />
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
