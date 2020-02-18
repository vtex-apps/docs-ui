import React from 'react'
import { useQuery } from 'react-apollo'
import PropsTable from './PropsTable'
import appAssetsQuery from '../graphql/appAssets.graphql'
import { useRuntime } from 'vtex.render-runtime'

const APPID = 'vtex.iframe@0.x'
const RENDERMAJOR = 8

const DocProp: FC<AppAssetsProps> = () => {
  const variables = {
    appId: APPID,
    renderMajor: RENDERMAJOR,
  }

  const { fetchComponents } = useRuntime()

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
  const components = Object.keys(la[0])
  fetchComponents(la[0]).then(result =>
    const componentData = __RENDER_8_COMPONENTS__[components[components.length - 1]]
    if (typeof componentData === 'undefined' || typeof componentData.schema === 'undefined') {
      return
    }
    console.log(
      'finished fetching schema: ',
      componentData.schema.properties
    )
    // <PropsTable/>
  )
  return <PropsTable/>
}

interface AppAssetsProps {
  appId: string
  renderMajor: number
}

export default DocProp
