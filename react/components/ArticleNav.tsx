import React, { FC, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { slug } from '../modules'

interface Props {
  headings: string[]
}

const ArticleNav: FC<Props> = ({ headings }) => (
  <nav className="flex-l flex-column dn">
    <div className="ttu t-small b pb3">
      <FormattedMessage id="docs-ui/article-nav" />
    </div>
    <Fragment>
      {headings.map(heading => {
        const slugifiedHeader = slug(heading)

        return (
          <a
            className="link c-muted-1 t-mini no-underline pb3 dim"
            href={`#${slugifiedHeader}`}
            key={slugifiedHeader}>
            {heading}
          </a>
        )
      })}
    </Fragment>
  </nav>
)

export default ArticleNav
