import React, { FC } from 'react'

import PropsTable from './PropsTable'

import useComponentSchema from './useComponentSchema'

const DocProp: FC<DocPropProps> = ({ blockInterface }) => {
  const appId = window.__RUNTIME__.route.params.app + '@0.x'

  const { loading, error, data } = useComponentSchema(appId, blockInterface)

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error...</p>
  }
  if (!data) {
    console.log('No data:', data)
    return null
  }
  return (
    <PropsTable fetchedProps={data.schema} fetchedMessages={data.messages} />
  )
}

interface DocPropProps {
  blockInterface: string
}

export default DocProp
