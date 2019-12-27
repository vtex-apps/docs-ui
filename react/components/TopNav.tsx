import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import SearchBar from './SearchBar'

const TopNav = () => (
  <nav className="w-100 db-l dn bg-base--inverted b--muted-3">
    <div className="flex w-100 justify-end">
      <div className="flex c-on-base--inverted pv5 items-center">
        <a
          href="https://help.vtex.com/developer-docs"
          className="t-small link c-on-base--inverted no-underline mv3 mh5 dim">
          <FormattedMessage id="docs/nav.api" />
        </a>
        <Link
          to="/docs#latest-releases"
          className="t-small link c-on-base--inverted no-underline mv3 mh5 dim">
          <FormattedMessage id="docs/latest-features" />
        </Link>
        <a
          href="https://www.vtex.com/partner/"
          className="t-small link c-on-base--inverted no-underline mv3 mh5 dim">
          <FormattedMessage id="docs/nav.partner" />
        </a>
        <SearchBar />
      </div>
    </div>
  </nav>
)

export default TopNav
