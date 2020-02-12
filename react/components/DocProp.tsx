import React from 'react'
import { useQuery } from 'react-apollo'

import appAssetsQuery from '../graphql/appAssets.graphql'
import { useRuntime } from 'vtex.render-runtime'

const APPID = 'vtex.doc-prop@0.x'
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
  console.log(la[0])
  //console.log(fetchComponents(la[0]))
  fetchComponents(la[0]).then(result =>
    console.log(
      'finished fetch: ',
      __RENDER_8_COMPONENTS__[APPID + '/Countdown'].schema.properties
    )
  )
  return <h1>props</h1>
}

interface AppAssetsProps {
  appId: string
  renderMajor: number
}

export default DocProp
