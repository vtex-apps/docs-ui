import React, { Fragment, FunctionComponent } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Helmet, NoSSR, withRuntimeContext } from 'vtex.render-runtime'
import { compose, graphql } from 'react-apollo'

import Footer from './components/Footer'
import SideBar from './components/SideBar'
import RecipeListItem from './components/RecipeListItem'
import { slug } from './utils'

import favicon from './images/favicon.png'

import * as RecipeList from './graphql/RecipeList.graphql'

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

const RecipesList: FunctionComponent<Props> = ({
  RecipeListQuery,
  runtime,
}) => {
  const {
    route: { params },
  } = runtime

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
          <div className="w-25 min-h-100">
            <SideBar />
          </div>
        </NoSSR>
        <div className="w-100">
          <div className="flex">
            <main className="flex w-80">
              <div className="pv9">
                <h1 className="t-heading-1 normal w-90 w-80-ns center mb6">
                  <FormattedMessage id={`docs/recipes/${params.category}`} />
                </h1>
                <p className="small c-on-base w-90 w-80-ns center mb8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  vel ligula sagittis, dignissim nisi non, interdum elit.
                  Vivamus eget dolor egestas, hendrerit urna a, finibus enim.
                  Phasellus mollis mollis dui ut mattis. In ut purus sem.
                  Quisque volutpat ornare consequat.
                </p>
                <div className="w-90 w-80-ns center">
                  {RecipeListQuery.getRecipeList.map((recipe: Recipe) => (
                    <RecipeListItem
                      key={slug(recipe.description)}
                      title={recipe.title}
                      description={recipe.description}
                      link={getShortRecipePath(recipe.path)}
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

interface Props {
  RecipeListQuery: { getRecipeList: Recipe[] }
  runtime: any
}

function getShortRecipePath(path: string) {
  // the path will always be something like: dist/vtex.docs-graphql/Recipes/<category>/<fileName>.md
  return path.substring(31, path.length - 3)
}

export default compose(
  withRuntimeContext,
  graphql(RecipeList.default, {
    name: 'RecipeListQuery',
    options: (props: { runtime: any }) => {
      const {
        route: { params },
      } = props.runtime
      return {
        variables: {
          category: params.category,
          appName: 'vtex.io-documentation@0.x',
        },
      }
    },
  })
)(RecipesList)
