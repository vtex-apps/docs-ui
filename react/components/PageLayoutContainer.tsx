import React, { Fragment, FunctionComponent } from 'react'
import { Helmet, NoSSR } from 'vtex.render-runtime'

import Footer from './Footer'

import favicon from '../images/favicon.png'
import SideBar from './SideBar'

const PageLayoutContainer: FunctionComponent = ({ children }) => {
  return (
    <Fragment>
      <Helmet>
        <title>VTEX IO Docs</title>
        <meta name="theme-color" content="#F71963" />
        <meta name="description" content="Documentation on VTEX IO" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="flex flex-row-l flex-column min-h-100">
        <NoSSR>
          <div className="w-25-l min-h-100-l">
            <SideBar />
          </div>
        </NoSSR>
        <div className="w-100">
          <div className="flex">
            <main className="flex w-90-l">{children}</main>
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

export default PageLayoutContainer
