import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import emoji from 'remark-emoji'
import { FormattedMessage } from 'react-intl'

import { CustomRenderers } from './CustomTags'

const DocsRenderer: FC<Props> = ({ markdown, meta }) => {
  return (
    <article className="ph0-l ph5 w-100 min-vh-100">
      <ReactMarkdown
        source={markdown}
        escapeHtml={false}
        renderers={CustomRenderers}
        plugins={[emoji]}
      />
      {meta.git && (
        <a href={meta.git}>
          <FormattedMessage id="docs/renderer-github" />
        </a>
      )}
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
}

export default DocsRenderer
