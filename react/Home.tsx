import React, { FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import { slug } from './modules'
import LatestFeatures from './components/LatestFeatures'
import Community from './components/Community'
import Recipes from './components/icons/Recipes'
import Components from './components/icons/Components'
import RightArrow from './components/icons/RightArrow'
import ProductImage from './images/product.png'

const Home: FC = () => {
  const intl = useIntl()

  return (
    <main className="w-100 w-70-ns">
      <h1
        id={slug(intl.formatMessage({ id: 'docs-ui/build' }))}
        className="t-heading-1 w-90 w-100-ns mb6 c-on-base"
        style={{
          maxWidth: '680px',
        }}>
        <FormattedMessage id="docs-ui/build" />
      </h1>
      <p className="small c-on-base w-100 mb8 lh-copy">
        <FormattedMessage id="docs-ui/build-description" />
      </p>
      <div className="w-100 center">
        <Link
          to="/docs/getting-started/build-stores-with-store-framework/1"
          className="flex-l mb8 w-100 pointer dim no-underline"
          style={{ height: '480px' }}>
          <div className="w-third-l w-100 pa6 bg-emphasis flex flex-column justify-end">
            <span className="t-small c-on-emphasis">
              <div className="ttu fw5 pb5">
                <FormattedMessage id="docs-ui/getting-started" />
              </div>
            </span>
            <h4 className="t-heading-2 mv1 w-90-l ttu c-on-emphasis">
              <FormattedMessage id="docs-ui/create-stores" />
            </h4>
          </div>
          <div
            className="w-two-thirds-l ph5-l h5 h-auto-l bg-base"
            style={{
              background: `no-repeat center/100% url(${ProductImage})`,
            }}
          />
        </Link>
        <div className="mb8 flex flex-row-l flex-column justify-around bg-base">
          <div className="mv6 mv0-l w-50-l flex">
            <div className="c-on-base" style={{ minWidth: '84px' }}>
              <Recipes />
            </div>
            <div className="ph5">
              <p className="t-heading-3 c-on-base mt0">
                <FormattedMessage id="docs-ui/recipes" />
              </p>
              <p className="c-on-base lh-copy">
                <FormattedMessage id="docs-ui/recipes-description" />
              </p>
              <div className="flex items-center dim">
                <Link
                  to="/docs/recipes/all"
                  className="link no-underline c-emphasis">
                  <span className="mr5">
                    <FormattedMessage id="docs-ui/see-all" />
                  </span>
                  <RightArrow />
                </Link>
              </div>
            </div>
          </div>
          <div className="mh3-l mv8 mv0-l w-50-l flex">
            <div className="c-on-base" style={{ minWidth: '84px' }}>
              <Components />
            </div>
            <div className="ph5">
              <p className="t-heading-3 c-on-base mt0">
                <FormattedMessage id="docs-ui/our-components" />
              </p>
              <p className="c-on-base lh-copy">
                <FormattedMessage id="docs-ui/our-components-description" />
              </p>
              <div className="c-emphasis flex items-center dim">
                <Link
                  to="/docs/components/all"
                  className="link no-underline c-emphasis">
                  <span className="mr5">
                    <FormattedMessage id="docs-ui/see-all" />
                  </span>
                  <RightArrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <LatestFeatures />
        <Community />
      </div>
    </main>
  )
}

export default Home
