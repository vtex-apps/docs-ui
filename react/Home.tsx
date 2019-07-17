import React, { Fragment, FunctionComponent } from 'react'
import { Helmet, NoSSR } from 'vtex.render-runtime'

import Footer from './components/Footer'
import HomeSideBar from './components/HomeSidebar'
import LatestFeatures from './components/LatestFeatures'
import Community from './components/Community'

import favicon from './images/favicon.png'

const Home: FunctionComponent<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>VTEX IO Docs</title>
        <meta name="theme-color" content="#F71963" />
        <meta name="description" content="Documentation on VTEX IO" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="flex min-h-100">
        <NoSSR>
          <div className="w-20 min-h-100">
            <HomeSideBar />
          </div>
        </NoSSR>
        <div className="w-100">
          <main className="w-80 flex">
            <div className="pv9">
              <h1 className="t-heading-1 normal c-emphasis w-90 w-80-ns center mb6">
                Build with IO
              </h1>
              <p className="small c-on-base w-90 w-80-ns center mb8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod.
              </p>
              <div className="w-90 w-80-ns center">
                <div className="flex w-100">
                  <div
                    className="pa5 bg-muted-5 flex flex-column justify-end"
                    style={{ width: '242px', height: '330px' }}>
                    <p className="t-small">
                      <strong>GETTING STARTED</strong>
                    </p>
                    <p className="t-heading-4 mv3 normal">
                      Create stores on IO with Store Framework
                    </p>
                  </div>
                  <div
                    className="pa5 bg-muted-3"
                    style={{ width: '517px', height: '330px' }}
                  />
                </div>
                <div className="mv6 flex justify-around">
                  <div>
                    <div
                      className="bg-muted-4"
                      style={{ width: '242px', height: '120px' }}
                    />
                    <p className="t-heading-4">Recipes</p>
                    <p className="c-muted-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod.
                    </p>
                  </div>
                  <div className="mh3">
                    <div
                      className="bg-muted-4"
                      style={{ width: '242px', height: '120px' }}
                    />
                    <p className="t-heading-4">Our components</p>
                    <p className="c-muted-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod.
                    </p>
                  </div>
                  <div>
                    <div
                      className="bg-muted-4"
                      style={{ width: '242px', height: '120px' }}
                    />
                    <p className="t-heading-4">Resources</p>
                    <p className="c-muted-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod.
                    </p>
                  </div>
                </div>
                <LatestFeatures />
                <Community />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

export default Home
