import React, { useState, FC } from 'react'
import { Link, useRuntime } from 'vtex.render-runtime'

import IconCaretDown from './icons/IconCaretDown'
import IconCaretRight from './icons/IconCaretRight'
import { slug } from '../modules'

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
  const {
    route: { path },
  } = useRuntime()

  // all links follow this pattern: /docs/<section>/<subsection | undefined>/<filename | undefined>
  const [linkSection, linkSubsection] = link?.split('/').slice(2) ?? ''
  const [currentSection, currentSubsection] = path.split('/').slice(2)
  const isExternalLink = !!link && link.match(/((http(s)?):\/)|(www.)/)

  const isCurrentSection =
    currentSection &&
    depth === 0 &&
    (linkSection === currentSection ||
      slug(text.toLowerCase()) === currentSection)

  const isCurrentSubsection =
    currentSubsection && depth === 1 && linkSubsection === currentSubsection

  const isActive = path.includes(link!)

  const shouldBeOpen = isActive || isCurrentSection || isCurrentSubsection

  const [open, setOpen] = useState(shouldBeOpen)

  const ZeroDepthItem = () => <div className="c-on-base f5 b">{text}</div>

  const NormalItem = () => <div className="mv3 dim f6">{text}</div>

  const BaseSideBarItem = () => (
    <div
      className={`flex justify-between items-center pointer ${
        depth === 0 ? 'mt4' : ''
      }
      ${depth >= 2 ? 'pl4 bl lh-title t-small bw1 pv1' : ''} ${
        isActive ? 'b--emphasis' : 'b--muted-3'
      }`}
      onClick={() => {
        return setOpen(!open)
      }}
      onKeyPress={() => {
        return setOpen(!open)
      }}
      role="menuitem"
      tabIndex={-1}>
      {depth === 0 ? (
        <ZeroDepthItem />
      ) : (
        <div className={`${isActive ? 'c-emphasis' : 'c-muted-2'}`}>
          <NormalItem />
        </div>
      )}
      <div className="pl3 flex items-center f5">
        {hasArticles &&
          depth === 0 &&
          (open ? <IconCaretDown /> : <IconCaretRight />)}
      </div>
    </div>
  )

  return (
    <div className="link">
      {link ? (
        <Link
          to={link}
          target={isExternalLink ? '_blank' : undefined}
          className={`no-underline ${isActive ? 'c-emphasis' : 'c-muted-2'}`}>
          <BaseSideBarItem />
        </Link>
      ) : (
        <BaseSideBarItem />
      )}
      {hasArticles && <div hidden={!open}>{children}</div>}
    </div>
  )
}

export default SideBarItem
