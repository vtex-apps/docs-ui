import React, { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import { FormattedMessage } from 'react-intl'

import { CustomRenderers } from './CustomTags'

const DocsRenderer: FunctionComponent<Props> = ({ markdown, meta }) => {
  return (
    <article className="ph9-l ph5 w-100 min-vh-100">
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
