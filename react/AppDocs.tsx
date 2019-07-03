import React, { Fragment, FunctionComponent } from 'react'
import { Helmet } from 'vtex.render-runtime'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import DocsRenderer from './components/DocsRenderer'
import favicon from './images/favicon.png'

const Docs: FunctionComponent<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Docs</title>
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <Navbar />
      <main className="w-100 pv10 bg-muted-1">
        <h1 className="c-base t-heading-1 w-90 w-80-ns center mb8">
          Documentation
        </h1>
        <div className="w-80-l w-90 center flex br3 bg-base">
          <aside className="w-25-l ml5-l w-90 center">
            <SideBar />
          </aside>
          <div className="w-75-l overflow-scroll">
            <DocsRenderer />
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Docs
