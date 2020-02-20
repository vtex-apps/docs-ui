import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import PropsTable from './PropsTable'
import appAssetsQuery from '../graphql/appAssets.graphql'
import { useRuntime } from 'vtex.render-runtime'

const APPID = 'vtex.iframe@0.x'
const RENDERMAJOR = 8

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
  callback()
}

const DocProp: FC<AppAssetsProps> = () => {
  const variables = {
    appId: APPID,
    renderMajor: RENDERMAJOR,
  }

  const { fetchComponents } = useRuntime()
  const [isFetched, setFetched] = useState(false)

  const { loading, error, data } = useQuery(appAssetsQuery, { variables })
  if (loading) return <p>Loading ...</p>
  if (error) return <p>Error...</p>
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
  return isFetched ? <PropsTable /> : <p>Loading...</p>
}

interface AppAssetsProps {
  appId: string
  renderMajor: number
}

export default DocProp
