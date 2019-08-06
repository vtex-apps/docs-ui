import React, { useState, FC } from 'react'

import { Link, useRuntime } from 'vtex.render-runtime'
import { IconCaretDown, IconCaretRight } from 'vtex.styleguide'
import { slug } from '../utils'

interface Props {
  text: string
  link?: string
  appName?: string
  hasArticles?: boolean
  depth: number
}

const SideBarItem: FC<Props> = ({
  text,
  link,
  depth,
  hasArticles,
  children,
}) => {
  const activeUrl = useRuntime().route.path
  const isActive = link === activeUrl
  const activeCategory = activeUrl.split('/')[2]
  const activeSubCategory = activeUrl.split('/')[3]
  const hasActiveChildren =
    slug(text.toLowerCase()) === activeCategory ||
    slug(text.toLowerCase()) === activeSubCategory
  const [open, setOpen] = useState(hasActiveChildren || isActive)

  const ZeroDepthItem = () =>
    text !== 'Introduction' ? <div className="mv4 c-on-base">{text}</div> : null

  const NormalItem = () => <div className="mv3">{text}</div>

  return (
    <div className="link">
      <div
        className={`flex justify-between items-center pointer ${
          depth >= 2 ? 'pl4 t-small' : ''
        }`}
        onClick={() => setOpen(!open)}
        onKeyPress={() => setOpen(!open)}
        role="menuitem"
        tabIndex={-1}>
        {link ? (
          <Link
            href={link}
            className={`no-underline ${isActive ? 'c-emphasis' : 'c-muted-2'}`}>
            {depth === 0 ? <ZeroDepthItem /> : <NormalItem />}
          </Link>
        ) : depth === 0 ? (
          <ZeroDepthItem />
        ) : (
          <div className={`${isActive ? 'c-emphasis' : 'c-muted-2'}`}>
            <NormalItem />
          </div>
        )}
        <div className="ph2">
          {hasArticles &&
            depth === 0 &&
            (open ? <IconCaretDown /> : <IconCaretRight />)}
        </div>
      </div>
      {hasArticles && <div hidden={!open}>{children}</div>}
    </div>
  )
}

export default SideBarItem
