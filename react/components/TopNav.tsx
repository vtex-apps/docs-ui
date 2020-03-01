import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'vtex.render-runtime'
import { useSideBarContentState } from './SideBarContext'
import { Drawer } from 'vtex.store-drawer'
import { IO_DOCUMENTATION } from '../utils/constants'

import VTEXPink from './icons/VTEXPink'
import SearchBar from './SearchBar'
import { formatLink } from '../utils'
import SideBarItem from './SideBarItem'

const navLinkClass =
  'dn flex-m items-center t-small link c-link no-underline mv3 mh5 dim'

const TopNav = () => {
  const { content } = useSideBarContentState()

  return (
    <nav className="fixed pv3 w-100 bg-base c-on-base b--muted-3 z-9999">
      <div className="flex wrapper content-center justify-between">
        <div className="flex items-center dn-l nl4">
          <Drawer>
            <div className="flex flex-column w-90 center" role="menu">
              {getArticles(content, 0, IO_DOCUMENTATION)}
            </div>
          </Drawer>
        </div>

        <Link to="/docs/home" className="flex items-center">
          <VTEXPink />
        </Link>

        <div className="flex">
          <a
            href="https://help.vtex.com/developer-docs"
            className={navLinkClass}>
            <FormattedMessage id="docs/nav.api" />
          </a>
          <a href="https://www.vtex.com/partner/" className={navLinkClass}>
            <FormattedMessage id="docs/nav.partner" />
          </a>
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}

interface Chapter {
  title: string
  path?: string
  articles: [] | Chapter[]
}

function getArticles(
  chapterList: Chapter[],
  depth: number,
  app?: string
): ReactElement {
  return (
    <div
      className={`list ${depth > 0 ? 'pl0-l pr2-l pb2 mt3' : 'pv6-l pr5-l'}`}>
      {chapterList.map((chapter: Chapter) => {
        return (
          <SideBarItem
            text={chapter.title}
            link={chapter.path && formatLink(chapter.path)}
            hasArticles={chapter.articles.length > 0}
            key={chapter.title}
            depth={depth}>
            {getArticles(chapter.articles, depth + 1, app)}
          </SideBarItem>
        )
      })}
    </div>
  )
}

export default TopNav
