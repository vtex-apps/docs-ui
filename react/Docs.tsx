import React, { Fragment, FunctionComponent } from 'react'
import { Helmet, Link } from 'vtex.render-runtime'
import { Card } from 'vtex.styleguide'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import favicon from './images/favicon.png'
import { availableDocs } from './DocsData'

const Docs: FunctionComponent<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Docs</title>
        <meta name="theme-color" content="#F71963" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <Navbar />
      <main className="w-100 pv10 bg-muted-1">
        <h1 className="c-base t-heading-1 w-90 w-80-ns center mb8">
          Documentation
        </h1>
        <div className="w-80-l w-90 center flex flex-wrap justify-between">
          {availableDocs.map((app) => (
            <div className="w-40 mv5">
              <Link to={`/docs/${app.urlName}`}>
                <Card>
                  <h2 className="t-heading-2 tc mv9 c-muted-5 no-underline">{app.formattedName}</h2>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Docs
