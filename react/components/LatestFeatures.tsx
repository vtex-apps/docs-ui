import React from 'react'

import { latest } from '../content/Latest'
import RightArrow from './icons/RightArrow'

const LatestFeatures = () => (
  <section className="mv7">
    <h2 className="t-heading-2 normal">VTEX IO Lastest Features</h2>
    <p className="c-muted-2">
      Here{"'"}s a sneak peek at the new features we added last week:
    </p>
    <ul className="list ml0 w-100">
      {latest.map(item => (
        <li className="pv5 bb b--muted-3" key={item.title}>
          <p className="t-heading-4">{item.title}</p>
          <p className="t-body c-on-base lh-copy">{item.description}</p>
        </li>
      ))}
    </ul>
    <div className="flex items-center mv5">
      <p className="t-body mr5">See all</p>
      <RightArrow />
    </div>
  </section>
)

export default LatestFeatures
