import React from 'react'
import { FormattedMessage } from 'react-intl'

const TopNav = () => (
  <nav className="w-100 flex-l dn bg-base--inverted">
    <div className="flex w-100 justify-end">
      <div className="flex c-on-base--inverted pv5">
        <a
          href="https://help.vtex.com/developer-docs"
          className="link c-on-base--inverted no-underline mv3 mh5">
          <FormattedMessage id="docs/nav.api" />
        </a>
        <a
          href="https://github.com/vtex-apps/release-notes"
          className="link c-on-base--inverted no-underline mv3 mh5">
          <FormattedMessage id="docs/nav.latest" />
        </a>
        <a
          href="https://www.vtex.com/partner/"
          className="link c-on-base--inverted no-underline mv3 mh5">
          <FormattedMessage id="docs/nav.partner" />
        </a>
      </div>
    </div>
  </nav>
)

export default TopNav
