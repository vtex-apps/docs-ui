import React, { FunctionComponent } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'

import LatestFeatures from './components/LatestFeatures'
import Community from './components/Community'
import ArticleNav from './components/ArticleNav'
import { slug } from './utils'
import PageLayoutContainer from './components/PageLayoutContainer'

const Home: FunctionComponent<InjectedIntlProps> = ({ intl }) => {
  const homeHeadings = [
    intl.formatMessage({ id: 'docs/build' }),
    intl.formatMessage({ id: 'docs/latest-features' }),
    intl.formatMessage({ id: 'docs/community-help' }),
  ]

  return (
    <PageLayoutContainer>
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
            <div className="w-25-l w-100 pt8 ph5 bg-muted-5 flex flex-column justify-end">
              <p className="t-small ttu pv6">
                <strong>
                  <FormattedMessage id="docs/getting-started" />
                </strong>
              </p>
              <p className="t-heading-4 mv3 normal pv6">
                <FormattedMessage id="docs/create-stores" />
              </p>
            </div>
            <div className="w-75-l pv10-l pa5-l bg-muted-3" />
          </div>
          <div className="mv6 flex flex-row-l flex-column justify-around">
            <div>
              <div className="bg-muted-4 w-100 pa8" />
              <p className="t-heading-4">
                <FormattedMessage id="docs/recipes" />
              </p>
              <p className="c-muted-1">
                <FormattedMessage id="docs/lorem-short" />
              </p>
            </div>
            <div className="mh3-l">
              <div className="bg-muted-4 w-100 pa8" />
              <p className="t-heading-4">
                <FormattedMessage id="docs/our-components" />
              </p>
              <p className="c-muted-1">
                <FormattedMessage id="docs/lorem-short" />
              </p>
            </div>
            <div>
              <div className="bg-muted-4 w-100 pa8" />
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
      <div className="pv9">
        <ArticleNav headings={homeHeadings} />
      </div>
    </PageLayoutContainer>
  )
}

export default injectIntl(Home)
