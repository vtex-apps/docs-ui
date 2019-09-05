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

  const isCurrentSection =
    currentSection &&
    (linkSection === currentSection ||
      slug(text.toLowerCase()) === currentSection)
  const isCurrentSubsection =
    currentSubsection && linkSubsection === currentSubsection
  const isActive = link === path

  const shouldBeOpen = isActive || isCurrentSection || isCurrentSubsection

  const [open, setOpen] = useState(shouldBeOpen)

  const ZeroDepthItem = () => <div className="c-on-base">{text}</div>

  const NormalItem = () => <div className="mb3">{text}</div>

  return text !== 'Introduction' ? (
    <div className="link">
      {link ? (
        <Link
          to={link}
          className={`no-underline ${isActive ? 'c-emphasis' : 'c-muted-2'}`}>
          <div
            className={`flex justify-between items-center pointer ${
              depth >= 2 ? 'pl4 bl lh-title t-small bw1 pv3' : ''
            } ${isActive ? 'b--emphasis' : 'b--muted-3'}`}
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
            <div className="ph2">
              {hasArticles &&
                depth === 0 &&
                (open ? <IconCaretDown /> : <IconCaretRight />)}
            </div>
          </div>
        </Link>
      ) : (
        <div
          className={`flex justify-between items-center pointer ${
            depth === 0 ? 'mb4' : ''
          } ${depth >= 2 ? 'pl3 lh-title t-small' : ''}`}
          onClick={() => setOpen(!open)}
          onKeyPress={() => setOpen(!open)}
          role="menuitem"
          tabIndex={-1}>
          {depth === 0 ? (
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
      )}
      {hasArticles && <div hidden={!open}>{children}</div>}
    </div>
  ) : null
}

export default SideBarItem
