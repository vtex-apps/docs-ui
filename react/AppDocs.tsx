import React, { Fragment, FunctionComponent } from 'react'
import { Helmet } from 'vtex.render-runtime'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import DocsRenderer from './components/DocsRenderer'
import { EnhancedAppVersionProvider } from './components/AppVersionContext'
import VersionSelector from './components/VersionSelector'
import favicon from './images/favicon.png'

const AppDocs: FunctionComponent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Docs</title>
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <Navbar />
      <main className="w-100 bg-base flex">
        <EnhancedAppVersionProvider>
          <div className="bg-muted-1 w-20">
            <SideBar />
          </div>
          <div className="pv10 w-80-l w-90 center flex flex-column">
            <div className="self-end ph9">
              <VersionSelector />
            </div>
            <DocsRenderer />
          </div>
        </EnhancedAppVersionProvider>
      </main>
      <Footer />
    </Fragment>
  )
}

export default AppDocs
