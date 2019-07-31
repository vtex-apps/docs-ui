import React, { FC } from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { branch, renderComponent } from 'recompose'
import { useRuntime } from 'vtex.render-runtime'

import ComponentGridItem from './components/ComponentGridItem'
import EmptyDocs from './components/EmptyDocs'
import { slug } from './utils'

import * as ComponentList from './graphql/componentsList.graphql'
import Skeleton from './components/Skeleton'

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

const ComponentsGrid: FC<any> = ({ ComponentsListQuery }) => {
  const {
    route: { params },
  } = useRuntime()

  const componentsListForCategory =
    ComponentsListQuery.componentsList[params.category]

  return (
    <div className="pv9 w-90 center">
      <h1 className="t-heading-1 fw1 normal center mb6">
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
                }/${(component.file && removeFileExtension(component.file)) ||
                  ''}`}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

function removeFileExtension(fileName: string) {
  const MARKDOWN_EXTENSION = '.md'
  return fileName.endsWith(MARKDOWN_EXTENSION)
    ? fileName.substring(0, fileName.length - MARKDOWN_EXTENSION.length)
    : fileName
}

export default compose(
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
    renderComponent(Skeleton)
  ),
  branch(
    ({ ComponentsListQuery }: any) => !!ComponentsListQuery.error,
    renderComponent(EmptyDocs)
  )
)(ComponentsGrid)
