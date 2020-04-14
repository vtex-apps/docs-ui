import React, { FC } from 'react'

import PropsTable from './components/PropsTable'

import useComponentSchema from './hooks/useComponentSchema'
import { Spinner, Alert } from 'vtex.styleguide'

const DocProp: FC<DocPropProps> = ({ blockInterface }) => {
  const appId = window.__RUNTIME__.route.params.app
  const interfaceId = window.__RUNTIME__.route.params.interfaceId

  const { loading, error, data } = useComponentSchema(
    appId,
    interfaceId || blockInterface
  )

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
