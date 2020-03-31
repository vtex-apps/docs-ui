/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, FC, useEffect } from 'react'
import { useQuery } from 'react-apollo'
import PropsTable from './PropsTable'
import appAssetsQuery from '../graphql/appAssets.graphql'
import { useRuntime } from 'vtex.render-runtime'
import useEffectComponent from './useEffectComponent'
import { stringify } from 'querystring'

const APPID = 'vtex.doc-prop@0.x'
const RENDERMAJOR = 8

const DocProp: FC<DocPropProps> = ({ blockInterface }) => {
  // const APPID = __RUNTIME__.route.params.app + '@0.x'
  const variables = {
    appId: APPID,
    renderMajor: RENDERMAJOR,
  }
  // componentName = 'Countdown'
  useEffect(() => {
    console.log('docprop mounted')
  }, [])
  const { loading, error, data } = useEffectComponent(variables)
  console.log('docprop', data)

  if (loading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <p>Error...</p>
  }

  if (!data) {
    console.log('returned null')
    return null
  }
  console.log('HEHE:', data.schema)

  return (
    <PropsTable fetchedProps={data.schema} fetchedMessages={data.messages} />
  )
}

interface DocPropProps {
  blockInterface: string
}

export default DocProp
