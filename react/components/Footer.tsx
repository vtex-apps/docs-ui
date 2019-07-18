import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

import VTEXBlack from './icons/VTEXBlack'
import ExternalLink from './icons/ExternalLink'

const Footer: FunctionComponent = () => {
  const listItemClasses = 't-body mv3 c-on-muted-4'

  return (
    <footer className="bg-base pa8 w-100 bg-muted-4">
      <div className="pt6 pb8">
        <VTEXBlack />
      </div>
      <div className="flex-l ph4 flex-wrap dn-s justify-between w-100">
        <div className="flex justify-between w-50">
          <div className="list">
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
          </div>
          <div className="list">
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
          </div>
        </div>
        <div className="flex">
          <p className="c-on-muted-3 self-baseline">
            <FormattedMessage id="docs/visit-us" /> <ExternalLink />
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
