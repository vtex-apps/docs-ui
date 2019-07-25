import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import RightArrow from './icons/RightArrow'

interface Props {
  title: string
  description: string
  link: string
}

const ComponentGridItem: FunctionComponent<Props> = ({
  title,
  description,
  link,
}) => (
  <article className="flex flex-column items-between pv4 mh3 bt b--muted-1">
    <h3 className="t-heading-4">{title}</h3>
    <div className="t-body c-on-base mv5">{description}</div>
    <Link to={link} className="flex items-center no-underline link c-emphasis">
      <span className="mr4 mv5">
        <FormattedMessage id="docs/read-more" />
      </span>
      <RightArrow />
    </Link>
  </article>
)

export default ComponentGridItem
