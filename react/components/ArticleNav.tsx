import React, { FC, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { slug } from '../utils'

interface Props {
  headings: string[]
}

const ArticleNav: FC<Props> = ({ headings }) => (
  <nav className="mt7 mb7 flex-l flex-column t-small dn pl7">
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
            className="link no-underline pb3"
            href={`#${slugifiedHeader}`}
            key={slugifiedHeader}>
            <span className="c-on-base">{heading}</span>
          </a>
        )
      })}
    </Fragment>
  </nav>
)

export default ArticleNav
