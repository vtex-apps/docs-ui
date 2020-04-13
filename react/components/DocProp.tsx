import React, { FC } from 'react'

import PropsTable from './PropsTable'

import useComponentSchema from '../hooks/useComponentSchema'
import { Spinner, Alert } from 'vtex.styleguide'

const DocProp: FC<DocPropProps> = ({ blockInterface }) => {
  const appId = window.__RUNTIME__.route.params.app + '@0.x'

  const { loading, error, data } = useComponentSchema(appId, blockInterface)

  if (loading) {
    return (
      <span className="dib c-muted-1">
        <Spinner color="currentColor" size={20} />
      </span>
    )
  }
  if (error) {
    return (
      <div className="mb5">
        <Alert type="error">Something went wrong...</Alert>
      </div>
    )
  }
  return data ? (
    <PropsTable fetchedProps={data.schema} fetchedMessages={data.messages} />
  ) : null
}

interface DocPropProps {
  blockInterface: string
}

export default DocProp
