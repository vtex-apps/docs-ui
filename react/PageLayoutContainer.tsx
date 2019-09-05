import React, { Fragment, FC } from 'react'
import { Helmet } from 'vtex.render-runtime'

import Footer from './components/Footer'

import favicon from './images/favicon.png'
import SideBar from './components/SideBar'
import TopNav from './components/TopNav'
import { EnhancedAppVersionProvider } from './components/AppVersionContext'
import { EnhancedSideBarContentProvider } from './components/SideBarContext'

const PageLayoutContainer: FC = ({ children }) => {
  return (
    <Fragment>
      <Helmet>
        <title>VTEX IO Docs</title>
        <meta name="theme-color" content="#F71963" />
        <meta name="description" content="Documentation on VTEX IO" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="flex flex-row-l flex-column vh-100-l">
        <EnhancedSideBarContentProvider>
          <div
            className="w-25-l vh-100-l overflow-y-scroll"
            style={{ maxWidth: '280px', minWidth: '200px' }}>
            <SideBar />
          </div>
        </EnhancedSideBarContentProvider>
        <div
          className="w-100 min-vh-100 overflow-y-scroll flex flex-column justify-between bg-base--inverted"
          style={{ scrollBehavior: 'smooth' }}>
          <TopNav />
          <main className="w-90-l center" style={{ maxWidth: '900px' }}>
            <EnhancedAppVersionProvider>
              <div className="flex">{children}</div>
            </EnhancedAppVersionProvider>
          </main>
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

export default PageLayoutContainer
