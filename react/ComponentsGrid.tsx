import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

import ComponentGridItem from './components/ComponentGridItem'
import EmptyDocs from './components/EmptyDocs'
import { slug } from './utils'
import { IO_DOCUMENTATION } from './utils/constants'
import ComponentList from './graphql/componentsList.graphql'

function removeFileExtension(fileName: string) {
  const MARKDOWN_EXTENSION = '.md'
  return fileName.endsWith(MARKDOWN_EXTENSION)
    ? fileName.substring(0, fileName.length - MARKDOWN_EXTENSION.length)
    : fileName
}

const ComponentsGrid: FC = () => {
  const {
    route: { params },
    page,
  } = useRuntime()

  const useAppsDirectory = page === 'docs.apps-list'

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
        <FormattedMessage id={`docs/components.${params.category}`} />
      </h1>
      <p className="t-body c-on-base center mb8 lh-copy">
        <FormattedMessage
          id={`docs/components.${params.category}-description`}
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
