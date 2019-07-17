import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

import VTEXBlack from './icons/VTEXBlack'
import ExternalLink from './icons/ExternalLink'

const Footer: FunctionComponent = () => {
  const listItemClasses = 't-body mv3 c-on-muted-3'

  return (
    <footer className="bg-base pa7-l w-100 pv7 bg-muted-3">
      <div className="pa6">
        <VTEXBlack />
      </div>
      <div className="flex-l ph4 flex-wrap dn-s justify-between w-100">
        <div className="flex">
          <ul className="list">
            <li className={listItemClasses}>
              <FormattedMessage id="docs/getting-started" />
            </li>
            <li className={listItemClasses}>
              <FormattedMessage id="docs/recipes" />
            </li>
            <li className={listItemClasses}>
              <FormattedMessage id="docs/components" />
            </li>
            <li className={listItemClasses}>
              <FormattedMessage id="docs/resources" />
            </li>
          </ul>
          <ul className="list">
            <li className={listItemClasses}>
              <FormattedMessage id="docs/community" />
            </li>
            <li className={listItemClasses}>
              <FormattedMessage id="docs/latest-features" />
            </li>
            <li className={listItemClasses}>
              <FormattedMessage id="docs/apis" />
            </li>
            <li className={listItemClasses}>
              <FormattedMessage id="docs/partner" />
            </li>
          </ul>
        </div>
        <p className="self-baseline c-on-muted-3">
          <FormattedMessage id="docs/visit-us" /> <ExternalLink />
        </p>
      </div>
    </footer>
  )
}

export default Footer
