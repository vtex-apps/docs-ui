import React from 'react'
import { FormattedMessage } from 'react-intl'

const TopNav = () => (
  <nav className="w-100 db-l dn bg-base bb b--muted-3">
    <div className="flex w-100 justify-end">
      <div className="flex c-on-base--inverted pv5">
        <a
          href="https://help.vtex.com/developer-docs"
          className="t-small link c-on-base no-underline mv3 mh5 dim">
          <FormattedMessage id="docs/nav.api" />
        </a>
        <a
          href="https://github.com/vtex-apps/release-notes"
          className="t-small link c-on-base no-underline mv3 mh5 dim">
          <FormattedMessage id="docs/nav.latest" />
        </a>
        <a
          href="https://www.vtex.com/partner/"
          className="t-small link c-emphasis no-underline mv3 mh5 dim">
          <FormattedMessage id="docs/nav.partner" />
        </a>
      </div>
    </div>
  </nav>
)

export default TopNav
