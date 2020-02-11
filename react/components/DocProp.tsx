import React from 'react'
import { Query } from 'react-apollo'

import appAssetsQuery from '../graphql/appAssets.graphql'
import { useRuntime } from 'vtex.render-runtime'

const APPID = 'vtex.doc-prop@0.x'
const RENDERMAJOR = 8

const DocProp = () => {
  const variables = {
    appId: APPID,
    renderMajor: RENDERMAJOR,
  }

  // const { fetchComponents } = useRuntime()

  return (
    <Query query={appAssetsQuery} variables={variables}>
      {({ data, loading }: any) => {
        if (loading) return null
        // console.log(fetchComponents(data.appAssets.componentsJSON))

        return <h1>oh, hello</h1>
      }}
    </Query>
  )

}

interface AppAssetsProps {
  appId: string
  renderMajor: number
}

export default DocProp
