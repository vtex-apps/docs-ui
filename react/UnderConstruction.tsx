import React, { Fragment, FunctionComponent } from 'react'
import { Helmet, NoSSR } from 'vtex.render-runtime'
import { EmptyState } from 'vtex.styleguide'

import Footer from './components/Footer'

import favicon from './images/favicon.png'
import SideBar from './components/SideBar'

const UnderConstruction: FunctionComponent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>VTEX IO Docs</title>
        <meta name="theme-color" content="#F71963" />
        <meta name="description" content="Documentation on VTEX IO" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="flex min-vh-100">
        <NoSSR>
          <div className="w-25-l min-h-100-l">
            <SideBar />
          </div>
        </NoSSR>
        <div className="w-100 flex flex-column justify-between">
          <div className="flex">
            <main className="w-100 pv10 min-vh-75">
              <EmptyState title="Under Construction">
                <p>This page is still being developed.</p>
                <p>Come back in a bit and something awesome should be here!</p>
              </EmptyState>
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

export default UnderConstruction
