import React, { FC, Fragment } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import { slug } from './utils'
import LatestFeatures from './components/LatestFeatures'
import Community from './components/Community'
import ArticleNav from './components/ArticleNav'
import Recipes from './components/icons/Recipes'
import Components from './components/icons/Components'
import RightArrow from './components/icons/RightArrow'

const Home: FC<InjectedIntlProps> = ({ intl }) => {
  const homeHeadings = [
    intl.formatMessage({ id: 'docs/build' }),
    intl.formatMessage({ id: 'docs/latest-features' }),
    intl.formatMessage({ id: 'docs/community-help' }),
  ]

  return (
    <Fragment>
      <div className="pv9 w-100">
        <h1
          id={slug(intl.formatMessage({ id: 'docs/build' }))}
          className="t-heading-1  w-90 w-80-ns center mb6">
          <FormattedMessage id="docs/build" />
        </h1>
        <p className="small c-on-base w-90 w-80-ns center mb8 lh-copy">
          <FormattedMessage id="docs/build-description" />
        </p>
        <div className="w-90 w-80-ns center">
          <div className="flex w-100">
            <div className="w-30-l w-100 ph5 pb5 bg-muted-5 flex flex-column justify-end">
              <span className="t-small">
                <strong className="ttu">
                  <FormattedMessage id="docs/getting-started" />
                </strong>
              </span>
              <h4 className="t-heading-4 mv1 w-90-l ttu">
                <FormattedMessage id="docs/create-stores" />
              </h4>
            </div>
            <div className="w-75-l pv10-l ph5-l bg-emphasis" />
          </div>
          <div className="mv9 flex flex-row-l flex-column justify-around">
            <div className="mv6 mv0-l">
              <div className="w-25-l w-10">
                <Recipes />
              </div>
              <p className="t-heading-4">
                <FormattedMessage id="docs/recipes" />
              </p>
              <p className="c-muted-1 lh-copy">
                <FormattedMessage id="docs/recipes-description" />
              </p>
              <div className="flex items-center">
                <Link to="recipes/all" className="link no-underline c-emphasis">
                  <span className="mr5">See all</span>
                  <RightArrow />
                </Link>
              </div>
            </div>
            <div className="mh3-l mv8 mv0-l">
              <div className="w-25-l w-10">
                <Components />
              </div>
              <p className="t-heading-4 ">
                <FormattedMessage id="docs/our-components" />
              </p>
              <p className="c-muted-1 lh-copy">
                <FormattedMessage id="docs/our-components-description" />
              </p>
              <div className="c-emphasis flex items-center">
                <Link
                  to="/docs/components/all"
                  className="link no-underline c-emphasis">
                  <span className="mr5">See all</span>
                  <RightArrow />
                </Link>
              </div>
            </div>
          </div>
          <LatestFeatures />
          <Community />
        </div>
      </div>
      <div className="pv9">
        <ArticleNav headings={homeHeadings} />
      </div>
    </Fragment>
  )
}

export default injectIntl(Home)
