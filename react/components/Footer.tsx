import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'

import VTEXWhite from './icons/VTEXWhite'
import ExternalLink from './icons/ExternalLink'

const Footer: FC = () => {
  const listItemClasses = 't-body mv3 c-muted-3'

  return (
    <footer className="bg-base pa8-l pa6 w-100 bg-base--inverted">
      <div className="pt6 pb8">
        <VTEXWhite />
      </div>
      <div className="flex-l ph4 flex-wrap justify-between w-100">
        <div className="flex justify-between w-50-l w-100">
          <div className="list">
            <div className={listItemClasses}>
              <FormattedMessage id="docs/getting-started" />
            </div>
            <div className={listItemClasses}>
              <FormattedMessage id="docs/recipes" />
            </div>
            <div className={listItemClasses}>
              <FormattedMessage id="docs/components" />
            </div>
            <div className={listItemClasses}>
              <FormattedMessage id="docs/resources" />
            </div>
          </div>
          <div className="list">
            <div className={listItemClasses}>
              <FormattedMessage id="docs/community" />
            </div>
            <div className={listItemClasses}>
              <FormattedMessage id="docs/latest-features" />
            </div>
            <div className={listItemClasses}>
              <FormattedMessage id="docs/apis" />
            </div>
            <div className={listItemClasses}>
              <FormattedMessage id="docs/partner" />
            </div>
          </div>
        </div>
        <div className="flex">
          <p className="c-muted-3 self-baseline">
            <FormattedMessage id="docs/visit-us" /> <ExternalLink />
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
