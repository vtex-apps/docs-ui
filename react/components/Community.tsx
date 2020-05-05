import React, { FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import { slug } from '../modules'
import CommunityIcon from './icons/CommunityIcon'

const Community: FC = () => {
  const intl = useIntl()

  return (
    <section className="mv9">
      <h2
        id={slug(intl.formatMessage({ id: 'docs-ui/community-help' }))}
        className="t-heading-2 c-on-base">
        <FormattedMessage id="docs-ui/community-help" />
      </h2>
      <Link
        target="_blank"
        href="https://github.com/vtex-apps/store-discussion"
        className="link no-underline pointer">
        <div className="flex items-center">
          <div style={{ minWidth: '84px' }}>
            <CommunityIcon />
          </div>
          <div className="ml6">
            <h4 className="t-heading-4 c-on-base mt0 mb3 dim">
              <FormattedMessage id="docs-ui/community-join" />
            </h4>
            <p className="t-body c-on-base lh-copy mv0">
              <FormattedMessage id="docs-ui/community-description" />
            </p>
          </div>
        </div>
      </Link>
    </section>
  )
}

export default Community
