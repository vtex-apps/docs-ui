/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, FC } from 'react'
import { useQuery } from 'react-apollo'
import PropsTable from './PropsTable'
import appAssetsQuery from '../graphql/appAssets.graphql'
import { useRuntime } from 'vtex.render-runtime'

const APPID = 'vtex.doc-prop@0.x'
const RENDERMAJOR = 8
let componentName = ''

let fetchedPropsContent: { [key: string]: { [key: string]: string } }

function getIndex(component: string, componentList: string[]) {
  for (let key of componentList) {
    if (key.includes(component)) {
      return key
    }
  }
  return ''
}

const useFetchComponents = async (
  fetchComponents: any,
  componentAssets: any,
  callback: any
) => {
  await fetchComponents(componentAssets)
  const componentData =
    __RENDER_8_COMPONENTS__[
      getIndex(componentName, Object.keys(componentAssets))
    ]
  if (
    typeof componentData === 'undefined' ||
    typeof componentData.schema === 'undefined'
  ) {
    return
  }
  fetchedPropsContent = componentData.schema.properties
  callback()
}

// const useMyFetchComponents = async (
//   fetchComponents: any,
//   componentAssets: any
// ) => {
//   await fetchComponents(componentAssets)
//   const componentData =
//     __RENDER_8_COMPONENTS__[
//       getIndex(componentName, Object.keys(componentAssets))
//     ]
//   if (
//     typeof componentData === 'undefined' ||
//     typeof componentData.schema === 'undefined'
//   ) {
//     return
//   }
//   fetchedPropsContent = componentData.schema.properties
// }

const DocProp: FC<DocPropProps> = ({ blockInterface }) => {
  // const APPID = __RUNTIME__.route.params.app + '@0.x'

  const variables = {
    appId: APPID,
    renderMajor: RENDERMAJOR,
  }
  componentName = 'Countdown'
  const { fetchComponents } = useRuntime()
  const [isFetched, setFetched] = useState(false)

  const { loading, error, data } = useQuery(appAssetsQuery, { variables })
  if (loading) {
    return <p>Loading ...</p>
  }
  if (error) {
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

  // useEffect(() => {
  //   console.log(isFetched)
  //   useMyFetchComponents(fetchComponents, la[0])
  //   setFetched(true)
  // }, [fetchComponents, la])

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
