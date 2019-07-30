import React from 'react'
import { FormattedMessage } from 'react-intl'

const TopNav = () => (
  <nav className="w-100 flex-l dn bg-base--inverted">
    <div className="flex w-90 justify-end">
      <div className="flex c-on-base--inverted pv5">
        <span className="mv3 mh5">
          <FormattedMessage id="docs/nav/docs" />
        </span>
        <span className="mv3 mh5">
          <FormattedMessage id="docs/nav/latest" />
        </span>
        <span className="mv3 mh5">
          <FormattedMessage id="docs/nav/partner" />
        </span>
      </div>
    </div>
  </nav>
)

export default TopNav
