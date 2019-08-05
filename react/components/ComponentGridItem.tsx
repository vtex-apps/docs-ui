import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import RightArrow from './icons/RightArrow'

interface Props {
  title: string
  description: string
  link: string
}

const ComponentGridItem: FC<Props> = ({ title, description, link }) => (
  <article
    className="flex flex-column justify-between mh3-l bt b--muted-1"
    style={{ height: '12rem' }}>
    <div>
      <h3 className="t-heading-4 mv5">{title}</h3>
      <div className="t-body c-on-base">{description}</div>
    </div>
    <Link to={link} className="flex items-center no-underline link c-emphasis">
      <span className="mr4 mv5">
        <FormattedMessage id="docs/read-more" />
      </span>
      <RightArrow />
    </Link>
  </article>
)

export default ComponentGridItem
