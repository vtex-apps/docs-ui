import React, { Fragment, FunctionComponent } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { Helmet, NoSSR, withRuntimeContext } from 'vtex.render-runtime'
import { compose, graphql } from 'react-apollo'
import { branch, renderComponent, renderNothing } from 'recompose'

import Footer from './components/Footer'
import SideBar from './components/SideBar'
import ComponentGridItem from './components/ComponentGridItem'
import EmptyDocs from './components/EmptyDocs'
import { slug } from './utils'

import favicon from './images/favicon.png'
import * as ComponentList from './graphql/componentsList.graphql'

defineMessages({
  general: {
    id: 'docs/components/general',
    defaultMessage: '',
  },
  navigation: {
    id: 'docs/components/navigation',
    defaultMessage: '',
  },
  product: {
    id: 'docs/components/product-related',
    defaultMessage: '',
  },
  search: {
    id: 'docs/components/search-related',
    defaultMessage: '',
  },
  all: {
    id: 'docs/components/all',
    defaultMessage: '',
  },
})

const ComponentsGrid: FunctionComponent<any> = ({
  ComponentsListQuery,
  runtime,
}) => {
  const {
    route: { params },
  } = runtime

  const componentsListForCategory =
    ComponentsListQuery.componentsList[params.category]

  return (
    <Fragment>
      <Helmet>
        <title>VTEX IO Docs</title>
        <meta name="theme-color" content="#F71963" />
        <meta name="description" content="Documentation on VTEX IO" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <div className="flex flex-row-l flex-column min-h-100">
        <NoSSR>
          <div className="w-25-l min-h-100-l">
            <SideBar />
          </div>
        </NoSSR>
        <div className="w-100">
          <div className="flex">
            <main className="flex w-90-l">
              <div className="pv9 w-90 center">
                <h1 className="t-heading-1 normal center mb6">
                  <FormattedMessage id={`docs/components/${params.category}`} />
                </h1>
                <p className="small c-on-base center mb8">
                  <FormattedMessage id="docs/lorem" />
                </p>
                <div className="flex flex-wrap">
                  {componentsListForCategory &&
                    componentsListForCategory.map((component: any) => (
                      <div key={slug(component.title)} className="w-50 w-25-l">
                        <ComponentGridItem
                          title={component.title}
                          description={component.description}
                          link={`${params.category}/${
                            component.appName
                          }/${(component.file &&
                            removeFileExtension(component.file)) ||
                            ''}`}
                        />
                      </div>
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

function removeFileExtension(fileName: string) {
  const MARKDOWN_EXTENSION = '.md'
  return fileName.endsWith(MARKDOWN_EXTENSION)
    ? fileName.substring(0, fileName.length - MARKDOWN_EXTENSION.length)
    : fileName
}

export default compose(
  withRuntimeContext,
  graphql(ComponentList.default, {
    name: 'ComponentsListQuery',
    options: {
      variables: {
        appName: 'vtex.io-documentation@0.x',
        locale: 'en',
      },
    },
  }),
  branch(
    ({ ComponentsListQuery }: any) => ComponentsListQuery.loading,
    renderNothing
  ),
  branch(
    ({ ComponentsListQuery }: any) => !!ComponentsListQuery.error,
    renderComponent(EmptyDocs)
  )
)(ComponentsGrid)
