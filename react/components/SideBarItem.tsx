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

  return (
    <div className="link">
      <div className="flex justify-between items-center">
        {link ? (
          <Link
            to={`/docs/${appName}/${link}`}
            className="no-underline c-on-base">
            {depth === 0 ? (
              <p className="mv4 t-heading-5">{text}</p>
            ) : (
              <p className="c-muted-2 mv3">{text}</p>
            )}
          </Link>
        ) : depth === 0 ? (
          <p className="mv4 t-heading-5">{text}</p>
        ) : (
          <p className="c-muted-2 mv3">{text}</p>
        )}
        <div
          className="ph4"
          onClick={() => setOpen(!open)}
          onKeyPress={() => setOpen(!open)}
          role="menuitem"
          tabIndex={-1}>
          {hasArticles && (open ? <IconCaretDown /> : <IconCaretRight />)}
        </div>
      </div>
      <div hidden={!open} className="pa3">
        {children}
      </div>
    </div>
  )
}

export default SideBarItem
