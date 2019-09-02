import React, { FC } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'

import { slug } from '../utils'
import CommunityIcon from './icons/CommunityIcon'

const Community: FC<InjectedIntlProps> = ({ intl }) => (
  <section className="mv9">
    <h2
      id={slug(intl.formatMessage({ id: 'docs/community-help' }))}
      className="t-heading-2">
      <FormattedMessage id="docs/community-help" />
    </h2>
    <a
      href="https://github.com/vtex-apps/store-discussion"
      className="link no-underline pointer">
      <div className="flex items-center">
        <div className="w-10-l w-25 mr6">
          <CommunityIcon />
        </div>
        <div className="ml6">
          <h4 className="t-heading-4  c-on-base">
            <FormattedMessage id="docs/community-join" />
          </h4>
          <p className="t-body c-on-base lh-copy">
            <FormattedMessage id="docs/community-description" />
          </p>
        </div>
      </div>
    </a>
  </section>
)

export default injectIntl(Community)
