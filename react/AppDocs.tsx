import React, { Fragment, FC } from 'react'
import { Helmet } from 'vtex.render-runtime'

import Footer from './components/Footer'
import SideBar from './components/SideBar'
import { EnhancedAppVersionProvider } from './components/AppVersionContext'
import VersionSelector from './components/VersionSelector'
import favicon from './images/favicon.png'

const AppDocs: FC = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Docs</title>
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <main className="w-100 bg-base flex">
        <EnhancedAppVersionProvider>
          <div className="w-25 min-h-100">
            <SideBar />
          </div>
          <div className="pv10 w-80-l w-90 center flex flex-column">
            <div className="self-end ph9">
              <VersionSelector />
            </div>
          </div>
        </EnhancedAppVersionProvider>
      </main>
      <Footer />
    </Fragment>
  )
}

export default AppDocs
