import React, { FC } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { withRuntimeContext } from 'vtex.render-runtime'
import { compose, graphql } from 'react-apollo'
import { branch, renderComponent } from 'recompose'

import RecipeListItem from './components/RecipeListItem'
import EmptyDocs from './components/EmptyAppDocs'
import { slug } from './utils'

import RecipeList from './graphql/recipesList.graphql'
import Skeleton from './components/Skeleton'

defineMessages({
  style: {
    id: 'docs/recipes/style',
    defaultMessage: '',
  },
  layout: {
    id: 'docs/recipes/layout',
    defaultMessage: '',
  },
  app: {
    id: 'docs/recipes/app',
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
  all: {
    id: 'docs/recipes/all',
    defaultMessage: '',
  },
})

const RecipesList: FC<any> = ({ RecipeListQuery, runtime }) => {
  const {
    route: { params },
  } = runtime

  return (
    <div className="pv9">
      <h1 className="t-heading-1 w-90 w-80-ns center mb6">
        <FormattedMessage id={`docs/recipes/${params.category}`} />
      </h1>
      <p className="small c-on-base w-90 w-80-ns center mb8">
        <FormattedMessage id="docs/lorem" />
      </p>
      <div className="w-90 w-80-ns center">
        {RecipeListQuery.recipeList.map((recipe: Recipe) => (
          <RecipeListItem
            key={slug(recipe.description)}
            title={recipe.title}
            description={recipe.description}
            link={getShortRecipePath(recipe.path)}
          />
        ))}
      </div>
    </div>
  )
}

interface Recipe {
  title: string
  description: string
  path: string
}

function getShortRecipePath(path: string) {
  // the path will always be something like: dist/vtex.docs-graphql/Recipes/<locale>/<category>/<fileName>.md
  const PATH_PREFIX = 'dist/vtex.docs-graphql/Recipes/'
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
  graphql(RecipeList, {
    name: 'RecipeListQuery',
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
    ({ RecipeListQuery }: any) => RecipeListQuery.loading,
    renderComponent(Skeleton)
  ),
  branch(
    ({ RecipeListQuery }: any) => !!RecipeListQuery.error,
    renderComponent(EmptyDocs)
  )
)(RecipesList)
