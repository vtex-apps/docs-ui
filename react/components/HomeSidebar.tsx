import React, { FunctionComponent, ReactElement } from 'react'

import { items } from '../content/SideBar'
import SideBarItem from './SideBarItem'

import VTEXBlack from './icons/VTEXBlack'

interface SideBarContent {
  text: string
  link: string
  articles: SideBarContent[] | []
}

const HomeSideBar = () => (
  <nav className="min-h-100 br b--muted-4">
    <VTEXBlack />
    {getArticles(items, 0)}
  </nav>
)

function getArticles(
  chapterList: SideBarContent[],
  depth: number
): ReactElement {
  return (
    <div className="list pa5">
      {chapterList.map((chapter: SideBarContent) => (
        <SideBarItem
          text={chapter.text}
          link={chapter.link}
          hasArticles={chapter.articles.length > 0}
          key={chapter.text}
          depth={depth}>
          {getArticles(chapter.articles, depth + 1)}
        </SideBarItem>
      ))}
    </div>
  )
}

export default HomeSideBar
