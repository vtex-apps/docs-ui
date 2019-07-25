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
    <p className="t-heading-4">{title}</p>
    <p className="t-body c-on-base">{description}</p>
    <Link to={link} className="flex items-center no-underline link c-emphasis">
      <p className="mr4">
        <FormattedMessage id="docs/read-more" />
      </p>
      <RightArrow />
    </Link>
  </article>
)

export default ComponentGridItem
