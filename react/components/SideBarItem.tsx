import React, { useState, FunctionComponent } from 'react'

import { Link } from 'vtex.render-runtime'
import { IconCaretDown, IconCaretUp } from 'vtex.styleguide'

interface Props {
  text: string
  link?: string
  appName: string
  hasArticles?: boolean
}

const SideBarItem: FunctionComponent<Props> = ({
  text,
  link,
  appName,
  hasArticles,
  children,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <li className="link">
      <div className="flex justify-between items-center">
        {link ? (
          <Link to={`/docs/${appName}/${link}`}>
            <p>{text}</p>
          </Link>
        ) : (
          <p>{text}</p>
        )}
        <div
          className="ph4"
          onClick={() => setOpen(!open)}
          onKeyPress={() => setOpen(!open)}
          role="menuitem"
          tabIndex={0}>
          {hasArticles && (open ? <IconCaretUp /> : <IconCaretDown />)}
        </div>
      </div>
      <div hidden={!open} className="pa3">
        {children}
      </div>
    </li>
  )
}

export default SideBarItem
