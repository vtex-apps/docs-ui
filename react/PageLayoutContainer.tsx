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
      <div className="flex flex-row-l flex-column min-vh-100">
        <EnhancedAppVersionProvider>
          <EnhancedSideBarContentProvider>
            <div
              className="w-25-l vh-100-l overflow-y-scroll"
              style={{ maxWidth: '256px' }}>
              <SideBar />
            </div>
          </EnhancedSideBarContentProvider>
          <div
            className="w-100 min-vh-100 overflow-y-scroll flex flex-column justify-between"
            style={{ scrollBehavior: 'smooth' }}>
            <TopNav />
            <main className="flex w-90-l" style={{ maxWidth: '1024px' }}>
              {children}
            </main>
            <Footer />
          </div>
        </EnhancedAppVersionProvider>
      </div>
    </Fragment>
  )
}

export default PageLayoutContainer
