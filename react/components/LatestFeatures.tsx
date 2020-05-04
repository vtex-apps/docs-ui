import React, { FC, Fragment } from 'react'
import { useQuery } from 'react-apollo'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from 'vtex.render-runtime'

import { slug } from '../modules'
import RightArrow from './icons/RightArrow'
import Skeleton from './Skeleton'
import LatestFeaturesQuery from '../graphql/storeFrameworkLatestFeatures.graphql'

interface LatestFeaturesQueryI {
  storeFrameworkLatestFeatures: LatestFeatureArticle[]
}

const LatestFeatures: FC = () => {
  const intl = useIntl()
  const { data, loading, error } = useQuery<LatestFeaturesQueryI>(
    LatestFeaturesQuery
  )

  return (
    <section className="mv9">
      <h2
        id={slug(intl.formatMessage({ id: 'docs-ui/latest-features' }))}
        className="t-heading-2 c-on-base mv4">
        <FormattedMessage id="docs-ui/latest-features" />
      </h2>
      <p className="c-on-base lh-copy">
        <FormattedMessage id="docs-ui/latest-features-description" />
      </p>
      <div className="list ml0 w-100">
        {loading ? (
          <Skeleton />
        ) : error ? (
          <></>
        ) : (
          <Fragment>
            {data!.storeFrameworkLatestFeatures.map(
              item =>
                item.title && (
                  <Link
                    key={item.title}
                    to={`/docs/releases/${getFileFromPath(item.path)}`}
                    className="no-underline">
                    <h4 className="t-heading-4 c-on-base mv2 dim pv6 items-center bl b--muted-3 pl5">
                      {item.title}
                    </h4>
                  </Link>
                )
            )}
          </Fragment>
        )}
      </div>
      <div className="flex items-center mv5">
        <Link
          page="docs-ui.release-notes"
          className="link no-underline c-emphasis mv5 dim">
          <span className="mr5">
            <FormattedMessage id="docs-ui/see-previous-releases" />
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

export default LatestFeatures
