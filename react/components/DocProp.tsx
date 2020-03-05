import React, { useState, FC } from 'react'
import { useQuery } from 'react-apollo'
import PropsTable from './PropsTable'
import appAssetsQuery from '../graphql/appAssets.graphql'
import { useRuntime } from 'vtex.render-runtime'

const APPID = 'vtex.rich-text@0.x'
const RENDERMAJOR = 8

let fetchedPropsContent: { [key: string]: { [key: string]: string } }

const useFetchComponents = async (
  fetchComponents: any,
  componentAssets: any,
  callback: any
) => {
  await fetchComponents(componentAssets)
  const component = Object.keys(componentAssets)
  const componentData = __RENDER_8_COMPONENTS__[component[component.length - 1]]
  if (
    typeof componentData === 'undefined' ||
    typeof componentData.schema === 'undefined'
  ) {
    return
  }
  fetchedPropsContent = componentData.schema.properties
  callback()
}

const DocProp: FC<DocPropProps> = ({ blockInterface }) => {
  // const APPID = __RUNTIME__.route.params.app + '@0.x'

  const variables = {
    appId: APPID,
    renderMajor: RENDERMAJOR,
  }

  console.log(blockInterface)

  const { fetchComponents } = useRuntime()
  const [isFetched, setFetched] = useState(false)

  const { loading, error, data } = useQuery(appAssetsQuery, { variables })
  if (loading) return <p>Loading ...</p>
  if (error) {
    console.log(error)
    return <p>Error...</p>
  }
  const la = JSON.parse(data.appAssets.componentsJSON)
  const messages = JSON.parse(data.appAssets.messagesJSON)
  if (
    typeof la === 'undefined' ||
    Object.keys(la).length === 0 ||
    Object.keys(la[0]).length === 0
  ) {
    return
  }

  useFetchComponents(fetchComponents, la[0], () => {
    setFetched(true)
  })
  const fetchedMessagesContent = messages
  return isFetched ? (
    <PropsTable
      fetchedProps={fetchedPropsContent}
      fetchedMessages={fetchedMessagesContent}
    />
  ) : (
    <p>Loading...</p>
  )
}

interface DocPropProps {
  blockInterface: string
}

export default DocProp
