import React from 'react'

import { items } from '../content/SideBar'

const HomeSideBar = () => (
  <nav>
    <ul className="list pa6 pt10">
      {items.map(item => (
        <li key={item.link}>
          <a href={item.link} className="no-underline">
            <p className="link c-muted-5">{item.text}</p>
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export default HomeSideBar
