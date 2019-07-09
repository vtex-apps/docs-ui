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
      <main className="w-100 bg-base--inverted flex">
        <div className="bg-muted-1 w-20">
          <SideBar />
        </div>
        <div className="pv10 w-80-l w-90 center">
          <DocsRenderer />
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Docs
