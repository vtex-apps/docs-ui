import React, { FC, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { slug } from '../utils'

interface Props {
  headings: string[]
}

const ArticleNav: FC<Props> = ({ headings }) => (
  <nav className="pa5 flex-l flex-column t-small dn">
    <p className="ttu">
      <strong>
        <FormattedMessage id="docs/article-nav" />
      </strong>
    </p>
    <Fragment>
      {headings.map(heading => {
        const slugifiedHeader = slug(heading)

        return (
          <a
            className="link no-underline"
            href={`#${slugifiedHeader}`}
            key={slugifiedHeader}>
            <p className="c-on-base">{heading}</p>
          </a>
        )
      })}
    </Fragment>
  </nav>
)

export default ArticleNav
