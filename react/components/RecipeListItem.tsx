import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import RightArrow from './icons/RightArrow'

interface Props {
  title: string
  icon?: string
  description: string
  link: string
}

const RecipeListItem: FC<Props> = ({ title, description, link }) => (
  <article className="flex flex-column justify-center w-70-l mv4 no-underline">
    <h2 className="t-heading-2 mb2">{title}</h2>
    <p className="t-body c-on-base mb4">{description}</p>
    <Link
      to={link}
      className="flex items-center mb5 c-emphasis link no-underline dim">
      <span className="mr4">
        <FormattedMessage id="docs-ui/read-more" />
      </span>
      <RightArrow />
    </Link>
  </article>
)

export default RecipeListItem
