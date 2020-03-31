import { useState, useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { useApolloClient } from 'react-apollo'
import appAssetsQuery from '../graphql/appAssets.graphql'
function getIndex(component: string, componentList: string[]) {
  for (let key of componentList) {
    if (key.includes(component)) {
      return key
    }
  }
  return ''
}
interface DataInterface {
  schema: Record<string, ObjSchemaInterface>
  messages: Record<string, Record<string, string>>
}
const useEffectComponent = (queryVariables: {
  appId: string
  renderMajor: number
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState<DataInterface | null>(null)
  const { fetchComponents } = useRuntime()
  const client = useApolloClient()
  const componentName = 'Countdown'

  useEffect(() => {
    client
      .query({
        query: appAssetsQuery,
        variables: queryVariables,
      })
      .then(({ data }) => {
        const { appAssets: { componentsJSON, messagesJSON } } = data
        const assetsList = JSON.parse(componentsJSON)
        const messagesFetched = JSON.parse(messagesJSON)

        const componentAssets = assetsList.length > 0 && assetsList[0]
        if (!componentAssets) {
          throw new Error(`Couldnt load component's asset`)
        }
        return fetchComponents(assetsList[0]).then(() => ({
          componentAssets,
          messagesFetched,
        }))
      })
      .then(({ componentAssets, messagesFetched }) => {
        const componentData =
          window.__RENDER_8_COMPONENTS__[
            getIndex(componentName, Object.keys(componentAssets))
          ]
        if (componentData.schema) {
          setData({
            schema: componentData.schema.properties,
            messages: messagesFetched,
          })
        }
      })
      .catch((error: { msg: any }) => {
        setError(error.msg)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return {
    loading,
    error,
    data,
  }
}

export default useEffectComponent
