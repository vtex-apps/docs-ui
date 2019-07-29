import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import RightArrow from './icons/RightArrow'

interface Props {
  title: string
  icon?: string
  description: string
  link: string
}

const RecipeListItem: FunctionComponent<Props> = ({
  title,
  description,
  link,
}) => (
  <article className="flex flex-column justify-center mv4 no-underline">
    <h2 className="t-heading-2 normal">{title}</h2>
    <p className="t-body c-on-base">{description}</p>
    <Link to={link} className="flex items-center mv5">
      <span className="mr4">
        <FormattedMessage id="docs/read-more" />
      </span>
      <RightArrow />
    </Link>
  </article>
)

export default RecipeListItem
