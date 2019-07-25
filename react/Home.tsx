import React, { Fragment, FunctionComponent } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'
import { Helmet, NoSSR } from 'vtex.render-runtime'

import Footer from './components/Footer'
import SideBar from './components/SideBar'
import LatestFeatures from './components/LatestFeatures'
import Community from './components/Community'
import ArticleNav from './components/ArticleNav'
import { slug } from './utils'

import favicon from './images/favicon.png'

const Home: FunctionComponent<InjectedIntlProps> = ({ intl }) => {
  const homeHeadings = [
    intl.formatMessage({ id: 'docs/build' }),
    intl.formatMessage({ id: 'docs/latest-features' }),
    intl.formatMessage({ id: 'docs/community-help' }),
  ]

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
          <div className="w-25 min-h-100">
            <SideBar />
          </div>
        </NoSSR>
        <div className="w-100">
          <div className="flex">
            <main className="flex w-80">
              <div className="pv9">
                <h1
                  id={slug(intl.formatMessage({ id: 'docs/build' }))}
                  className="t-heading-1 normal c-emphasis w-90 w-80-ns center mb6">
                  <FormattedMessage id="docs/build" />
                </h1>
                <p className="small c-on-base w-90 w-80-ns center mb8">
                  <FormattedMessage id="docs/lorem-short" />
                </p>
                <div className="w-90 w-80-ns center">
                  <div className="flex w-100">
                    <div
                      className="pa5 bg-muted-5 flex flex-column justify-end"
                      style={{ width: '242px', height: '330px' }}>
                      <p className="t-small ttu">
                        <strong>
                          <FormattedMessage id="docs/getting-started" />
                        </strong>
                      </p>
                      <p className="t-heading-4 mv3 normal">
                        <FormattedMessage id="docs/create-stores" />
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
                      <p className="t-heading-4">
                        <FormattedMessage id="docs/recipes" />
                      </p>
                      <p className="c-muted-1">
                        <FormattedMessage id="docs/lorem-short" />
                      </p>
                    </div>
                    <div className="mh3">
                      <div
                        className="bg-muted-4"
                        style={{ width: '242px', height: '120px' }}
                      />
                      <p className="t-heading-4">
                        <FormattedMessage id="docs/our-components" />
                      </p>
                      <p className="c-muted-1">
                        <FormattedMessage id="docs/lorem-short" />
                      </p>
                    </div>
                    <div>
                      <div
                        className="bg-muted-4"
                        style={{ width: '242px', height: '120px' }}
                      />
                      <p className="t-heading-4">
                        <FormattedMessage id="docs/resources" />
                      </p>
                      <p className="c-muted-1">
                        <FormattedMessage id="docs/lorem-short" />
                      </p>
                    </div>
                  </div>
                  <LatestFeatures />
                  <Community />
                </div>
              </div>
            </main>
            <div className="pv9">
              <ArticleNav headings={homeHeadings} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

export default injectIntl(Home)
