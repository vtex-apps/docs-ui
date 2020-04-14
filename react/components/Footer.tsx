import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import VTEXWhite from './icons/VTEXWhite'
import ExternalLink from './icons/ExternalLink'

const Footer: FC = () => {
  const listItemClasses = 't-body mv3 c-muted-3'

  return (
    <footer className="bg-base pt8-l pt6 ph0-l pb0-l w-100 bg-base--inverted bt b--muted-5">
      <div className="pb8 ph7-l">
        <VTEXWhite />
      </div>
      <div className="flex-l ph4 flex-wrap justify-between w-100 ph8-l pb8-l">
        <div className="flex justify-between w-50-l w-100 pb5 pb0-l">
          <div className="list">
            <div className={listItemClasses}>
              <Link
                to="getting-started/what-is-vtex-io/1"
                className="link no-underline c-on-base--inverted dim">
                <FormattedMessage id="docs-ui/getting-started" />
              </Link>
            </div>
            <div className={listItemClasses}>
              <Link
                to="recipes/all"
                className="link no-underline c-on-base--inverted dim">
                <FormattedMessage id="docs-ui/recipes" />
              </Link>
            </div>
            <div className={listItemClasses}>
              <Link
                to="components/all"
                className="link no-underline c-on-base--inverted dim">
                <FormattedMessage id="docs-ui/our-components" />
              </Link>
            </div>
          </div>
          <div className="list">
            <div className={listItemClasses}>
              <Link
                to="https://github.com/vtex-apps/store-discussion"
                className="link no-underline c-on-base--inverted dim">
                <FormattedMessage id="docs-ui/community" />
              </Link>
            </div>
            <div className={listItemClasses}>
              <Link
                to="https://github.com/vtex-apps/release-notes"
                className="link no-underline c-on-base--inverted dim">
                <FormattedMessage id="docs-ui/latest-features" />
              </Link>
            </div>
            <div className={listItemClasses}>
              <Link
                to="https://help.vtex.com/developer-docs"
                className="link no-underline c-on-base--inverted dim">
                <FormattedMessage id="docs-ui/apis" />
              </Link>
            </div>
            <div className={listItemClasses}>
              <Link
                to="https://www.vtex.com/partner/"
                className="link no-underline c-on-base--inverted dim">
                <FormattedMessage id="docs-ui/partner" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex ph4 pb6 bt b--muted-5 ph8-l"
        style={{ height: '89px' }}>
        <Link
          to="https://vtex.com"
          className="c-on-base--inverted link no-underline self-end dim">
          <FormattedMessage id="docs-ui/visit-us" /> <ExternalLink />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
