import React from 'react'

import { items } from '../content/SideBar'

const HomeSideBar = () => (
  <nav>
    <ul className="list">
      {items.map((item) => (
        <li>
          <a href={item.link} className="no-underline">
            <p className="link c-muted-5 no-underline">{item.text}</p>
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export default HomeSideBar
