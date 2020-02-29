import React, { Fragment, FC } from 'react'
import { Helmet } from 'vtex.render-runtime'

import Footer from './components/Footer'
import TopNav from './components/TopNav'
import favicon from './images/favicon.png'
import SideBar from './components/SideBar'
import PageView from './components/PageView'
import { EnhancedAppVersionProvider } from './components/AppVersionContext'
import { EnhancedSideBarContentProvider } from './components/SideBarContext'

const PageLayoutContainer: FC = ({ children }) => (
  <Fragment>
    <Helmet>
      <title>VTEX IO Docs</title>
      <meta name="theme-color" content="#F71963" />
      <meta name="description" content="Documentation on VTEX IO" />
      <link rel="icon" href={favicon} />
      <meta
        name="google-site-verification"
        content="ZY7HyfLauXkjLwWBR75Ff2YSVYbosRZuuk4mFk4wjig"
      />
    </Helmet>
    <EnhancedSideBarContentProvider>
      <TopNav />
      <PageView />
      <div className="navPusher">
        <div className="wrapper w-100 flex">
          <div className="docsNavContainer" style={{ maxWidth: '280px' }}>
            <SideBar />
          </div>
          <div
            className="mainContainer pt7 pl8-l"
            style={{ scrollBehavior: 'smooth' }}>
            <main className="flex">
              <EnhancedAppVersionProvider>
                {children}
              </EnhancedAppVersionProvider>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </EnhancedSideBarContentProvider>
  </Fragment>
)

export default PageLayoutContainer
