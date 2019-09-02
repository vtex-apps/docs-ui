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
  const {
    route: { path },
  } = useRuntime()

  // all links follow this pattern: /docs/<section>/<subsection | undefined>/<filename | undefined>
  const [linkSection, linkSubsection] = (link && link.split('/').slice(2)) || ''
  const [currentSection, currentSubsection] = path.split('/').slice(2)

  const isCurrentSection =
    linkSection === currentSection ||
    slug(text.toLowerCase()) === currentSection
  const isCurrentGettingStartedTrack =
    linkSubsection === currentSubsection && linkSection === 'getting-started'
  const isCurrentSubsection =
    currentSubsection && linkSubsection === currentSubsection
  const isActive = link === path || isCurrentGettingStartedTrack

  const shouldBeOpen = isActive || isCurrentSection || isCurrentSubsection

  const [open, setOpen] = useState(shouldBeOpen)

  const ZeroDepthItem = () =>
    text !== 'Introduction' ? <div className="mv4 c-on-base">{text}</div> : null

  const NormalItem = () => <div className="mv3">{text}</div>

  return (
    <div className="link">
      {link ? (
        <Link
          to={link}
          className={`no-underline ${isActive ? 'c-emphasis' : 'c-muted-2'}`}>
          <div
            className={`flex justify-between items-center pointer ${
              depth >= 2 ? 'pl4 t-small' : ''
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
            depth >= 2 ? 'pl4 t-small' : ''
          }`}
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
  )
}

export default SideBarItem
