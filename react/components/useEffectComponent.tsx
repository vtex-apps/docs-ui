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
      .then(async ({ data }) => {
        const assetsList = JSON.parse(data.appAssets.componentsJSON)
        const messagesFetched = JSON.parse(data.appAssets.messagesJSON)
        const componentAssets = assetsList.length > 0 && assetsList[0]
        if (!componentAssets) {
          console.log('componentAssets')
          setLoading(false)
          setError('Couldnt load component asset')
          return
        }
        await fetchComponents(assetsList[0])
        const componentData =
          window.__RENDER_8_COMPONENTS__[
            getIndex(componentName, Object.keys(componentAssets))
          ]
        if (componentData.schema) {
          console.log('IOIOO')
          console.log(componentData.schema.properties)
          setLoading(false)
          setData({
            schema: componentData.schema.properties,
            messages: messagesFetched,
          })
          console.log('data:', data)
        }
      })
      .catch((error: { msg: any }) => {
        console.log('error')
        setLoading(false)
        setError(error.msg)
      })
  }, [queryVariables])
  return {
    loading,
    error,
    data,
  }
}

export default useEffectComponent
