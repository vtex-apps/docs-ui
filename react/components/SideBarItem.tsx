import React, { useState, FC } from 'react'

import { Link, useRuntime } from 'vtex.render-runtime'
import IconCaretDown from './icons/IconCaretDown'
import IconCaretRight from './icons/IconCaretRight'
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
  const {
    route: { path },
  } = useRuntime()

  // all links follow this pattern: /docs/<section>/<subsection | undefined>/<filename | undefined>
  const [linkSection, linkSubsection] = (link && link.split('/').slice(2)) || ''
  const [currentSection, currentSubsection] = path.split('/').slice(2)
  const isExternalLink = !!link && link.match(/((http(s)?):\/)|(www.)/)

  const isCurrentSection =
    currentSection &&
    (linkSection === currentSection ||
      slug(text.toLowerCase()) === currentSection)
  const isCurrentSubsection =
    currentSubsection && linkSubsection === currentSubsection
  const isActive = link === path

  const shouldBeOpen = isActive || isCurrentSection || isCurrentSubsection

  const [open, setOpen] = useState(shouldBeOpen)

  const ZeroDepthItem = () => <div className="c-on-base dim">{text}</div>

  const NormalItem = () => <div className="mv3 dim">{text}</div>

  const BaseSideBarItem = () => (
    <div
      className={`flex justify-between items-center pointer ${
        depth === 0 ? 'mt4' : ''
      }
            ${depth >= 2 ? 'pl4 bl lh-title t-small bw1 pv1' : ''} ${
        isActive ? 'b--emphasis' : 'b--muted-3'
      }`}
      onClick={() => {
        if (shouldBeOpen && open) return
        return setOpen(!open)
      }}
      onKeyPress={() => {
        if (shouldBeOpen && open) return
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
      <div className="pl3 flex items-center" style={{ height: '24px' }}>
        {hasArticles &&
          depth === 0 &&
          (open ? <IconCaretDown /> : <IconCaretRight />)}
      </div>
    </div>
  )

  return text !== 'Introduction' ? (
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
  ) : null
}

export default SideBarItem
