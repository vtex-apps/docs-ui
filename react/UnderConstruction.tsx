import React, { Fragment, FunctionComponent } from 'react'
import { Helmet } from 'vtex.render-runtime'
import { EmptyState } from 'vtex.styleguide'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import favicon from './images/favicon.png'

const UnderConstruction: FunctionComponent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Docs</title>
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <Navbar />
      <main className="w-100 pv10 min-vh-75 bg-base">
        <EmptyState title="Under Construction">
          <p>This page is still being developed.</p>
          <p>Come back in a bit and something awesome should be here!</p>
        </EmptyState>
      </main>
      <Footer />
    </Fragment>
  )
}

export default UnderConstruction
