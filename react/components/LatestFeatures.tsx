import React from 'react'
import slugify from 'slugify'

import { latest } from '../content/Latest'
import RightArrow from './icons/RightArrow'
import { FormattedMessage } from 'react-intl'

const LatestFeatures = () => (
  <section className="mv9">
    <h2 className="t-heading-2 normal mv4">
      <FormattedMessage id="docs/latest-features" />
    </h2>
    <p className="c-muted-2">
      <FormattedMessage id="docs/latest-features-description" />
    </p>
    <div className="list ml0 w-100">
      {latest.map(item => (
        <div
          className="pv4 bb b--muted-3 items-center"
          key={slugify(item.description)}>
          <p className="t-heading-4 normal mv2">{item.title}</p>
          <p className="t-body c-on-base mb2">{item.description}</p>
        </div>
      ))}
    </div>
    <div className="flex items-center mv5">
      <p className="t-body mr5">
        <FormattedMessage id="docs/see-all" />
      </p>
      <RightArrow />
    </div>
  </section>
)

export default LatestFeatures
