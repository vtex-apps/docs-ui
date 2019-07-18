import React, { useState, FunctionComponent } from 'react'

import { Link } from 'vtex.render-runtime'
import { IconCaretDown, IconCaretRight } from 'vtex.styleguide'

interface Props {
  text: string
  link?: string
  appName?: string
  hasArticles?: boolean
  depth: number
}

const SideBarItem: FunctionComponent<Props> = ({
  text,
  link,
  appName,
  depth,
  hasArticles,
  children,
}) => {
  const [open, setOpen] = useState(false)
  const linkUrl = link && `/docs${appName ? `/${appName}` : ''}/${link}`

  const ZeroDepthItem = () => <p className="mv4 t-heading-5">{text}</p>

  const NormalItem = () => <p className="c-muted-2 mv3">{text}</p>

  return (
    <div className="link">
      <div
        className={`flex justify-between items-center ${
          depth >= 2 ? 'b--muted-3 bl bw1 pl4 t-small' : ''
        }`}
        onClick={() => setOpen(!open)}
        onKeyPress={() => setOpen(!open)}
        role="menuitem"
        tabIndex={-1}>
        {linkUrl ? (
          <Link to={linkUrl} className="no-underline c-on-base">
            {depth === 0 ? <ZeroDepthItem /> : <NormalItem />}
          </Link>
        ) : depth === 0 ? (
          <ZeroDepthItem />
        ) : (
          <NormalItem />
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
