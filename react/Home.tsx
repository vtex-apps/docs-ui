import React, { FC } from 'react'
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import { slug } from './utils'
import LatestFeatures from './components/LatestFeatures'
import Community from './components/Community'
import Recipes from './components/icons/Recipes'
import Components from './components/icons/Components'
import RightArrow from './components/icons/RightArrow'

const Home: FC<InjectedIntlProps> = ({ intl }) => {
  return (
    <main className="w-100-l center bg-base--inverted">
      <div className="w-90 center" style={{ maxWidth: '900px' }}>
        <div className="pv9 w-100">
          <h1
            id={slug(intl.formatMessage({ id: 'docs/build' }))}
            className="t-heading-1 w-90 w-100-ns mb6 c-on-base--inverted"
            style={{ fontSize: '115px', maxWidth: '680px' }}>
            <FormattedMessage id="docs/build" />
          </h1>
          <p className="small c-on-base--inverted w-90 w-100-ns center mb8 lh-copy">
            <FormattedMessage id="docs/build-description" />
          </p>
          <div className="w-90 w-100-ns center">
            <Link
              to="/docs/getting-started/build-stores-with-vtex-io/1"
              className="flex w-100 pointer dim no-underline"
              style={{ height: '480px' }}>
              <div className="w-third-l w-100 pa6 bg-emphasis flex flex-column justify-end">
                <span className="t-small c-on-emphasis">
                  <div className="ttu fw5 pb5">
                    <FormattedMessage id="docs/getting-started" />
                  </div>
                </span>
                <h4 className="t-heading-2 mv1 w-90-l ttu c-on-emphasis">
                  <FormattedMessage id="docs/create-stores" />
                </h4>
              </div>
              <div
                className="w-two-thirds-l ph5-l bg-base--inverted"
                style={{
                  backgroundImage:
                    'url(https://vtex.io/_v/public/assets/v1/published/vtex.io-landing@1.0.3/public/react/be2f84e526c5ea2bd40f1df1b56155ec.svg)',
                }}
              />
            </Link>
            <div className="mv10 flex flex-row-l flex-column justify-around">
              <div className="mv6 mv0-l w-50-l flex">
                <div
                  className="c-on-base--inverted"
                  style={{ minWidth: '84px' }}>
                  <Recipes />
                </div>
                <div className="ph5">
                  <p className="t-heading-3 c-on-base--inverted mt0">
                    <FormattedMessage id="docs/recipes" />
                  </p>
                  <p className="c-on-base--inverted lh-copy">
                    <FormattedMessage id="docs/recipes-description" />
                  </p>
                  <div className="flex items-center dim">
                    <Link
                      to="/docs/recipes/all"
                      className="link no-underline c-emphasis">
                      <span className="mr5">
                        <FormattedMessage id="docs/see-all" />
                      </span>
                      <RightArrow />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mh3-l mv8 mv0-l w-50-l flex">
                <div
                  className="c-on-base--inverted"
                  style={{ minWidth: '84px' }}>
                  <Components />
                </div>
                <div className="ph5">
                  <p className="t-heading-3 c-on-base--inverted mt0">
                    <FormattedMessage id="docs/our-components" />
                  </p>
                  <p className="c-on-base--inverted lh-copy">
                    <FormattedMessage id="docs/our-components-description" />
                  </p>
                  <div className="c-emphasis flex items-center dim">
                    <Link
                      to="/docs/components/all"
                      className="link no-underline c-emphasis">
                      <span className="mr5">
                        <FormattedMessage id="docs/see-all" />
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
        </div>
      </div>
    </main>
  )
}

export default injectIntl(Home)
