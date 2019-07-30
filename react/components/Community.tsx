import React, { FunctionComponent } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'

import { slug } from '../utils'
import CommunityIcon from './icons/CommunityIcon'

const Community: FunctionComponent<InjectedIntlProps> = ({ intl }) => (
  <section className="mv9">
    <h2
      id={slug(intl.formatMessage({ id: 'docs/community-help' }))}
      className="t-heading-2 normal">
      <FormattedMessage id="docs/community-help" />
    </h2>
    <div className="flex items-center">
      <div className="w-10-l w-25 mr6">
        <CommunityIcon />
      </div>
      <div className="ml6">
        <p className="t-heading-4">
          <FormattedMessage id="docs/community-join" />
        </p>
        <p>
          <FormattedMessage id="docs/lorem-short" />
        </p>
      </div>
    </div>
  </section>
)

export default injectIntl(Community)
