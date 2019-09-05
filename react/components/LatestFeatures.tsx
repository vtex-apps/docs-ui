import React, { FC, Fragment } from 'react'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import { slug } from '../utils'
import RightArrow from './icons/RightArrow'
import Skeleton from './Skeleton'

import LatestFeaturesQuery from '../graphql/storeFrameworkLatestFeatures.graphql'

const LatestFeatures: FC<InjectedIntlProps> = ({ intl }) => {
  return (
    <section className="mv9">
      <h2
        id={slug(intl.formatMessage({ id: 'docs/latest-features' }))}
        className="t-heading-2 c-on-base--inverted mv4">
        <FormattedMessage id="docs/latest-features" />
      </h2>
      <p className="c-on-base--inverted lh-copy">
        <FormattedMessage id="docs/latest-features-description" />
      </p>
      <div className="list ml0 w-100">
        <Query query={LatestFeaturesQuery}>
          {({
            loading,
            error,
            data,
          }: {
            loading: boolean
            error?: ApolloError
            data: { storeFrameworkLatestFeatures: LatestFeatureArticle[] }
          }) => {
            if (loading) return <Skeleton />
            if (error) return null

            return (
              <Fragment>
                {data.storeFrameworkLatestFeatures.map(
                  item =>
                    item.title && (
                      <Link
                        to={`/docs/releases/${getFileFromPath(item.path)}`}
                        className="no-underline">
                        <div
                          className="pv6 bb b--muted-1 items-center"
                          key={slug(item.description)}>
                          <h4 className="t-heading-4 c-on-base--inverted mv2 dim">
                            {item.title}
                          </h4>
                          <p className="t-body c-muted-4 mb2 lh-copy mt4">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    )
                )}
              </Fragment>
            )
          }}
        </Query>
      </div>
      <div className="flex items-center mv5">
        <Link
          href="https://github.com/vtex-apps/release-notes"
          target="_blank"
          className="link no-underline c-emphasis mv5 dim">
          <span className="mr5">
            <FormattedMessage id="docs/see-all" />
          </span>
          <RightArrow />
        </Link>
      </div>
    </section>
  )
}

function getFileFromPath(path: string) {
  const PATH_PREFIX = 'dist/vtex.docs-graphql/'
  const FILE_EXTENSION = '.md'
  return path.substring(PATH_PREFIX.length, path.length - FILE_EXTENSION.length)
}

interface LatestFeatureArticle {
  title: string
  description: string
  path: string
}

export default injectIntl(LatestFeatures)
