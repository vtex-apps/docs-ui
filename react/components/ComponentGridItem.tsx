import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import styles from './ComponentGridItem.css'
import RightArrow from './icons/RightArrow'

interface Props {
  title: string
  description: string
  link: string
}

const ComponentGridItem: FC<Props> = ({ title, description, link }) => (
  <article
    className={`flex flex-column justify-between mh3-l mb5 bt b--muted-1 ${styles.gridItem}`}>
    <div>
      <h2 className="t-heading-4 mv5">{title}</h2>
      <div className="t-body c-on-base lh-copy">{description}</div>
    </div>
    <Link
      to={link}
      className="flex items-center no-underline link c-emphasis dim">
      <span className="mr4 mt3 mt5-ns mv5">
        <FormattedMessage id="docs-ui/read-more" />
      </span>
      <span className="dn db-ns">
        <RightArrow />
      </span>
    </Link>
  </article>
)

export default ComponentGridItem
