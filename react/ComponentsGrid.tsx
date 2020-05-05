import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

import ComponentGridItem from './components/ComponentGridItem'
import EmptyDocs from './components/EmptyDocs'
import { slug, removeFileExtension } from './modules'
import { IO_DOCUMENTATION } from './modules/constantExports'
import ComponentList from './graphql/componentsList.graphql'

const ComponentsGrid: FC = () => {
  const {
    route: { params },
    page,
  } = useRuntime()

  const useAppsDirectory = page === 'docs-ui.apps-list'

  const { data, error, loading } = useQuery<{
    componentsList: Record<
      string,
      Array<{
        appName: string
        file: string
        title: string
        description: string
        url: string
      }>
    >
  }>(ComponentList, {
    variables: {
      appName: IO_DOCUMENTATION,
      locale: 'en',
      useAppsDirectory,
    },
  })

  if (loading) return null

  if (error || !data) {
    return <EmptyDocs />
  }

  const [category] = params.category.split('-')
  const shouldShowAllComponents = category === 'all'

  const componentsListFromCategory = shouldShowAllComponents
    ? Object.keys(data.componentsList).flatMap(
        categoryName => data.componentsList[categoryName]
      )
    : data.componentsList[category]

  return (
    <div className="w-100 center">
      <h1 className="t-heading-1 center mb6">
        <FormattedMessage id={`docs-ui/components.${params.category}`} />
      </h1>
      <p className="t-body c-on-base center mb8 lh-copy">
        <FormattedMessage
          id={`docs-ui/components.${params.category}-description`}
        />
      </p>
      <div className="flex flex-wrap">
        {componentsListFromCategory?.map(component => {
          const hasTitleAndDescription =
            component && !!(component.appName && component.description)

          return (
            hasTitleAndDescription && (
              <div key={slug(component.title)} className="w-50 w-third-ns">
                <ComponentGridItem
                  title={component.title}
                  description={component.description}
                  link={`/docs/components/${params.category}/${
                    component.appName
                  }/${(component.file &&
                    slug(removeFileExtension(component.file))) ||
                    ''}`}
                />
              </div>
            )
          )
        })}
      </div>
    </div>
  )
}

export default ComponentsGrid
