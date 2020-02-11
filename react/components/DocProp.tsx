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

  const { fetchComponents } = useRuntime()

  return (
    <Query query={appAssetsQuery} variables={variables}>
      {({ data, loading }: any) => {
        if (loading) return null
        let la = JSON.parse(data.appAssets.componentsJSON)
        console.log(la.entries[0])
        console.log(fetchComponents(la.entries[0]))
        return <h1>props</h1>
      }}
    </Query>
  )

}

interface AppAssetsProps {
  appId: string
  renderMajor: number
}

export default DocProp
