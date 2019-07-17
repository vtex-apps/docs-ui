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
    <ul className="list pa5 pt9">
      {getArticles(items, 'vtex.docs-ui', '2.x')}
    </ul>
  </nav>
)

function getArticles(
  chapterList: SideBarContent[],
  app: string,
  version: string
): any {
  return chapterList.map((chapter: SideBarContent) => (
    <SideBarItem
      appName={app}
      text={chapter.text}
      link={chapter.link}
      hasArticles={chapter.articles.length > 0}
      key={app}>
      {getArticles(chapter.articles, app, version)}
    </SideBarItem>
  ))
}

export default HomeSideBar
