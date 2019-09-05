import React, { ReactElement, FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Drawer } from 'vtex.store-drawer'
import { Link } from 'vtex.render-runtime'

import SideBarItem from './SideBarItem'
import { formatLink } from '../utils'
import { useSideBarContentState } from './SideBarContext'

import VTEXPink from './icons/VTEXPink'

interface Chapter {
  title: string
  path?: string
  articles: [] | Chapter[]
}

const SideBar: FC = () => {
  const appName = 'vtex.io-documentation@0.x'
  const { content } = useSideBarContentState()

  return (
    <nav className="w-100 fixed static-l bg-base z-2 min-h-100-l br-l b--muted-3 flex-l flex-column">
      {/* Mobile navigation */}
      <div className="flex items-center dn-l bb b--muted-3">
        <div className="w-50 pl4">
          <Drawer>
            <div className="flex flex-column w-90 center" role="menu">
              {getArticles(content, 0, appName)}
            </div>
          </Drawer>
        </div>
        <div className="w-100 center">
          <Link to="/docs/home">
            <VTEXPink />
          </Link>
        </div>
      </div>
      {/* Desktop navigation */}
      <div
        className="dn flex-l flex-column min-vh-100 justify-between"
        role="menu">
        <div>
          <Link to="/docs/home" className="flex pt2 mt2 pl3">
            <VTEXPink />
          </Link>
          {getArticles(content, 0, appName)}
        </div>
        <div
          className="bg-base sticky pa6 z3 bottom-0 w-100 bt b--muted-3"
          style={{ maxWidth: '280px', minWidth: '215px' }}>
          <div className="t-small mb2">
            <FormattedMessage id="docs/did-not-find-your-answer" />
          </div>
          <Link
            to="https://github.com/vtex-apps/store-discussion"
            target="_blank"
            rel="noopener noreferrer"
            className="t-body c-emphasis no-underline">
            <FormattedMessage id="docs/join-discussion" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

function getArticles(
  chapterList: Chapter[],
  depth: number,
  app?: string
): ReactElement {
  return (
    <div
      className={`list ${
        depth > 0 ? 'pl0-l pr2-l pb2 mt3' : 'pv6-l pl6-l pr5-l'
      }`}>
      {chapterList.map((chapter: Chapter) => (
        <SideBarItem
          text={chapter.title}
          link={chapter.path && formatLink(chapter.path)}
          hasArticles={chapter.articles.length > 0}
          key={chapter.title}
          depth={depth}>
          {getArticles(chapter.articles, depth + 1, app)}
        </SideBarItem>
      ))}
    </div>
  )
}

export default SideBar
