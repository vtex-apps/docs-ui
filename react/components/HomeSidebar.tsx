import React from 'react'

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
    <ul className="list pr5 pb5 pl7 pt9">{getArticles(items, 0)}</ul>
  </nav>
)

function getArticles(chapterList: SideBarContent[], depth: number): any {
  return chapterList.map((chapter: SideBarContent) => (
    <SideBarItem
      text={chapter.text}
      link={chapter.link}
      hasArticles={chapter.articles.length > 0}
      key={chapter.text}
      depth={depth}>
      {getArticles(chapter.articles, depth + 1)}
    </SideBarItem>
  ))
}

export default HomeSideBar
