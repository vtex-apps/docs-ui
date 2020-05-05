import React, { ReactElement, FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import SideBarItem from './SideBarItem'
import { formatLink } from '../modules'
import { useSideBarContentState } from './SideBarContext'
import { IO_DOCUMENTATION } from '../modules/constantExports'

interface Chapter {
  title: string
  path?: string
  articles: [] | Chapter[]
}

const SideBar: FC = () => {
  const { content } = useSideBarContentState()

  return (
    <nav className="w-100 fixed static-l bg-base z-2 min-h-100-l br-l b--muted-3 flex-l flex-column">
      <div className="dn flex-l flex-column justify-between" role="menu">
        <div>{getArticles(content, 0, IO_DOCUMENTATION)}</div>
        <div
          className="bg-base sticky pa6 z3 bottom-0 w-100 bt b--muted-3"
          style={{ maxWidth: '280px', minWidth: '215px' }}>
          <div className="t-small mb2">
            <FormattedMessage id="docs-ui/did-not-find-your-answer" />
          </div>
          <Link
            to="https://github.com/vtex-apps/store-discussion"
            target="_blank"
            rel="noopener noreferrer"
            className="t-body c-emphasis no-underline dim">
            <FormattedMessage id="docs-ui/join-discussion" />
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
      className={`list ${depth > 0 ? 'pl0-l pr2-l pb2 mt3' : 'pv6-l pr5-l'}`}>
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
