import React, { Fragment, FunctionComponent } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Helmet, NoSSR, withRuntimeContext } from 'vtex.render-runtime'
import { compose, graphql } from 'react-apollo'
import { branch, renderComponent, renderNothing } from 'recompose'

import Footer from './components/Footer'
import SideBar from './components/SideBar'
import RecipeListItem from './components/RecipeListItem'
import EmptyDocs from './components/EmptyAppDocs'
import { slug } from './utils'

import favicon from './images/favicon.png'
import * as ResourcesList from './graphql/resourcesList.graphql'

defineMessages({
  style: {
    id: 'docs/recipes/style',
    defaultMessage: '',
  },
  layout: {
    id: 'docs/recipes/layout',
    defaultMessage: '',
  },
  content: {
    id: 'docs/recipes/content',
    defaultMessage: '',
  },
  routes: {
    id: 'docs/recipes/routes',
    defaultMessage: '',
  },
  plugins: {
    id: 'docs/recipes/plugins',
    defaultMessage: '',
  },
  'custom-blocks': {
    id: 'docs/recipes/custom-blocks',
    defaultMessage: '',
  },
})

const RecipesList: FunctionComponent<any> = ({ ResourcesListQuery }) => {
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
                  {ResourcesListQuery.resourcesList.map((recipe: Recipe) => (
                    <RecipeListItem
                      key={slug(recipe.description)}
                      title={recipe.title}
                      description={recipe.description}
                      link={`resources/${getShortRecipePath(recipe.path)}`}
                    />
                  ))}
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

interface Recipe {
  title: string
  description: string
  path: string
}

function getShortRecipePath(path: string) {
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

export default compose(
  withRuntimeContext,
  graphql(ResourcesList.default, {
    name: 'ResourcesListQuery',
    options: (props: { runtime: any }) => {
      const {
        route: { params },
      } = props.runtime
      return {
        variables: {
          category: params.category,
          appName: 'vtex.io-documentation@0.x',
          locale: 'en',
        },
      }
    },
  }),
  branch(
    ({ ResourcesListQuery }: any) => ResourcesListQuery.loading,
    renderNothing
  ),
  branch(
    ({ ResourcesListQuery }: any) =>
      !!ResourcesListQuery.error ||
      ResourcesListQuery.resourcesList.length === 0,
    renderComponent(EmptyDocs)
  )
)(RecipesList)
