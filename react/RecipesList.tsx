import React, { FC } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { branch, renderComponent } from 'recompose'
import { withRuntimeContext, InjectedRuntime } from 'vtex.render-runtime'

import RecipeListItem from './components/RecipeListItem'
import EmptyDocs from './components/EmptyAppDocs'
import { slug } from './utils'

import RecipeList from './graphql/recipesList.graphql'
import Skeleton from './components/Skeleton'

defineMessages({
  style: {
    id: 'docs/recipes.style',
    defaultMessage: '',
  },
  styleDescription: {
    id: 'docs/recipes.style-description',
    defaultMessage: '',
  },
  layout: {
    id: 'docs/recipes.layout',
    defaultMessage: '',
  },
  layoutDescription: {
    id: 'docs/recipes.layout-description',
    defaultMessage: '',
  },
  app: {
    id: 'docs/recipes.app',
    defaultMessage: '',
  },
  appDescription: {
    id: 'docs/recipes.app-description',
    defaultMessage: '',
  },
  routes: {
    id: 'docs/recipes.routes',
    defaultMessage: '',
  },
  routesDescription: {
    id: 'docs/recipes.routes-description',
    defaultMessage: '',
  },
  plugins: {
    id: 'docs/recipes.plugins',
    defaultMessage: '',
  },
  pluginsDescription: {
    id: 'docs/recipes.plugins-description',
    defaultMessage: '',
  },
  store: {
    id: 'docs/recipes.store',
    defaultMessage: '',
  },
  storeDescription: {
    id: 'docs/recipes.store-description',
    defaultMessage: '',
  },
  'custom-blocks': {
    id: 'docs/recipes.custom-blocks',
    defaultMessage: '',
  },
  'custom-blocksDescription': {
    id: 'docs/recipes.custom-blocks-description',
    defaultMessage: '',
  },
  all: {
    id: 'docs/recipes.all',
    defaultMessage: '',
  },
  allDescription: {
    id: 'docs/recipes.all-description',
    defaultMessage: '',
  },
})

const RecipesList: FC<OuterProps & InjectedRuntime> = ({
  RecipeListQuery,
  runtime,
}) => {
  const {
    route: {
      params: { category },
    },
  } = runtime

  return (
    <div className="pv9">
      <h1 className="t-heading-1 w-90 w-80-ns center mb6">
        <FormattedMessage id={`docs/recipes.${category}`} />
      </h1>
      <p className="small c-on-base w-90 w-80-ns center mb8">
        <FormattedMessage id={`docs/recipes.${category}-description`} />
      </p>
      <div className="w-90 w-80-ns center">
        {RecipeListQuery.recipeList.map((recipe: Recipe) => (
          <RecipeListItem
            key={slug(recipe.description)}
            title={recipe.title}
            description={recipe.description}
            link={`/docs/recipes/${getShortRecipePath(recipe.path)}`}
          />
        ))}
      </div>
    </div>
  )
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

interface Recipe {
  title: string
  description: string
  path: string
}

interface OuterProps {
  RecipeListQuery: {
    recipeList: Recipe[]
    loading: boolean
    error?: ApolloError
  }
}

export default compose(
  withRuntimeContext,
  graphql(RecipeList, {
    name: 'RecipeListQuery',
    options: (props: InjectedRuntime) => {
      const {
        route: {
          params: { category },
        },
      } = props.runtime
      const shouldFetchAllRecipes = category === 'all'

      return {
        variables: {
          category: shouldFetchAllRecipes ? '' : category,
          appName: 'vtex.io-documentation@0.x',
          locale: 'en',
        },
      }
    },
  }),
  branch(
    ({ RecipeListQuery }: OuterProps) => RecipeListQuery.loading,
    renderComponent(Skeleton)
  ),
  branch(
    ({ RecipeListQuery }: OuterProps) => !!RecipeListQuery.error,
    renderComponent(EmptyDocs)
  )
)(RecipesList)
