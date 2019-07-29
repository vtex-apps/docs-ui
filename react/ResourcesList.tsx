import React, { Fragment, FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Helmet, NoSSR, withRuntimeContext } from 'vtex.render-runtime'
import { compose, graphql } from 'react-apollo'
import { branch, renderComponent, renderNothing } from 'recompose'

import Footer from './components/Footer'
import SideBar from './components/SideBar'
import RecipeListItem from './components/RecipeListItem'
import EmptyDocs from './components/EmptyAppDocs'
import { slug } from './utils'

import favicon from './images/favicon.png'
import * as ResourceList from './graphql/resourcesList.graphql'

const ResourcesList: FunctionComponent<InnerProps> = ({
  ResourcesListQueryData,
}) => {
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
          <div className="w-25-l min-h-100-l">
            <SideBar />
          </div>
        </NoSSR>
        <div className="w-100">
          <div className="flex">
            <main className="flex w-80-l w-90">
              <div className="pv9">
                <h1 className="t-heading-1 normal w-90 w-80-ns center mb6">
                  <FormattedMessage id="docs/resources" />
                </h1>
                <p className="small c-on-base w-90 w-80-ns center mb8">
                  <FormattedMessage id="docs/lorem" />
                </p>
                <div className="w-90 w-80-ns center">
                  {ResourcesListQueryData.resourcesList.map(
                    (resource: Resource) => (
                      <RecipeListItem
                        key={slug(resource.description)}
                        title={resource.title}
                        description={resource.description}
                        link={`resources/${getShortResourcePath(
                          resource.path
                        )}`}
                      />
                    )
                  )}
                </div>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}

function getShortResourcePath(path: string) {
  // the path will always be something like: dist/vtex.docs-graphql/<locale>/Resources/<fileName>.md
  const PATH_PREFIX = 'dist/vtex.docs-graphql/Resources/'
  // the <locale> section will always be one of 'en/', 'pt/', 'es/'
  const LOCALE_LENGTH = 3
  const FILE_EXTENSION = '.md'
  return path.substring(
    PATH_PREFIX.length + LOCALE_LENGTH,
    path.length - FILE_EXTENSION.length
  )
}

interface Resource {
  title: string
  description: string
  path: string
}

interface QueryResults {
  loading: boolean
  resourcesList: Resource[]
}

interface InnerProps {
  ResourcesListQueryData: QueryResults
}

export default compose(
  withRuntimeContext,
  graphql(ResourceList.default, {
    name: 'ResourcesListQuery',
    options: {
      variables: {
        appName: 'vtex.io-documentation@0.x',
        locale: 'en',
      },
    },
  }),
  branch(
    ({ ResourcesListQueryData }: InnerProps) => ResourcesListQueryData.loading,
    renderNothing
  ),
  branch(
    ({ ResourcesListQueryData }: InnerProps) =>
      !ResourcesListQueryData.resourcesList ||
      ResourcesListQueryData.resourcesList.length === 0,
    renderComponent(EmptyDocs)
  )
)(ResourcesList)
