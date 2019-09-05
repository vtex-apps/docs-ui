import React, { FC } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import { slug } from '../utils'
import CommunityIcon from './icons/CommunityIcon'

const Community: FC<InjectedIntlProps> = ({ intl }) => (
  <section className="mv9">
    <h2
      id={slug(intl.formatMessage({ id: 'docs/community-help' }))}
      className="t-heading-2 c-on-base--inverted">
      <FormattedMessage id="docs/community-help" />
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
          <h4 className="t-heading-4 c-on-base--inverted mt0 mb3">
            <FormattedMessage id="docs/community-join" />
          </h4>
          <p className="t-body c-muted-4 lh-copy mv0">
            <FormattedMessage id="docs/community-description" />
          </p>
        </div>
      </div>
    </Link>
  </section>
)

export default injectIntl(Community)
