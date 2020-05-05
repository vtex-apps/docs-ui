import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { graphql } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import { branch, compose, renderComponent, renderNothing } from 'recompose'
import { withRuntimeContext, InjectedRuntime } from 'vtex.render-runtime'

import { IO_DOCUMENTATION } from './modules/constantExports'
import RecipeListItem from './components/RecipeListItem'
import EmptyDocs from './components/EmptyAppDocs'
import { slug } from './modules'
import RecipeList from './graphql/recipesList.graphql'

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
    <div>
      <h1 className="t-heading-1 mb6">
        <FormattedMessage id={`docs-ui/recipes.${category}`} />
      </h1>
      <p className="t-body c-on-base w-70-ns">
        <FormattedMessage id={`docs-ui/recipes.${category}-description`} />
      </p>
      <div>
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

export default compose<any, any>(
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
          appName: IO_DOCUMENTATION,
          locale: 'en',
        },
      }
    },
  }),
  branch(
    ({ RecipeListQuery }: OuterProps) => RecipeListQuery.loading,
    renderNothing
  ),
  branch(
    ({ RecipeListQuery }: OuterProps) => !!RecipeListQuery.error,
    renderComponent(EmptyDocs)
  )
)(RecipesList)
