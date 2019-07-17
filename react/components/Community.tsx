import React from 'react'
import { FormattedMessage } from 'react-intl'

const Community = () => (
  <section className="mv9">
    <h2 className="t-heading-2 normal">
      <FormattedMessage id="docs/community-help" />
    </h2>
    <div className="flex items-center">
      <div className="bg-muted-2" style={{ width: '242px', height: '120px' }} />
      <div className="ml4">
        <p className="t-heading-4">
          <FormattedMessage id="docs/community-join" />
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </p>
      </div>
    </div>
  </section>
)

export default Community
