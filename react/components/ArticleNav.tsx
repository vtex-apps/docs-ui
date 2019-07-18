import React, { FunctionComponent, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import { slug } from '../utils'

interface Props {
  headings: string[]
}

const ArticleNav: FunctionComponent<Props> = ({ headings }) => (
  <nav className="pa5 flex flex-column t-small">
    <p className="ttu">
      <strong>
        <FormattedMessage id="docs/article-nav" />
      </strong>
    </p>
    <Fragment>
      {headings.map(heading => {
        const slugifiedHeader = slug(heading)

        return (
          <AnchorLink
            className="link no-underline"
            offset={() => 80}
            href={`#${slugifiedHeader}`}
            key={slugifiedHeader}>
            <p className="c-muted-2">{heading}</p>
          </AnchorLink>
        )
      })}
    </Fragment>
  </nav>
)

export default ArticleNav
