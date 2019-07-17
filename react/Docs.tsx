import React, { Fragment, FunctionComponent } from 'react'
import { Helmet, Link } from 'vtex.render-runtime'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCard from './components/CustomCard'
import HomeSideBar from './components/HomeSidebar'

import favicon from './images/favicon.png'
import { items } from './content/HomeCards'

const Docs: FunctionComponent<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Docs</title>
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <Navbar />
      <main className="w-100 bg-base flex">
        <div className="bg-muted-1 w-20">
          <HomeSideBar />
        </div>
        <div className="pv10">
          <h1 className="c-base t-heading-1 w-90 w-80-ns center mb8">
            Documentation
          </h1>
          <div className="w-80-l w-90 center flex flex-wrap justify-between">
            {items.map(item => (
              <div className="w-40 mv5" key={item.link}>
                <Link to={item.link} className="no-underline">
                  <CustomCard>
                    <h4 className="t-heading-4 tc c-muted-5">{item.text}</h4>
                  </CustomCard>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Docs
