import React from 'react'
import EnumTable from '../components/EnumTable'
import ObjectsTable from '../components/ObjectsTable'
import ArrayTable from '../components/ArrayTable'

export const mapCustomTypes = (
  propsObj: Record<string, ObjSchemaInterface>,
  messages: Record<string, Record<string, string>>
) => {
  let mappedTypes: JSX.Element[] = []
  let mappedProps: Record<string, ObjSchemaInterface> = propsObj
  for (const key in mappedProps) {
    let currentComponent: JSX.Element | null = null
    const currentProp = mappedProps[key]
    if (currentProp.enum) {
      currentProp.type = `${key.charAt(0).toLocaleUpperCase()}${key.slice(
        1
      )}Enum`
      currentComponent = (
        <EnumTable
          enumProps={currentProp}
          messages={messages}
          propTitle={currentProp.type}
        />
      )
    } else if (currentProp.type === 'object') {
      currentProp.type = `${key.charAt(0).toLocaleUpperCase()}${key.slice(1)}`
      currentComponent = (
        <ObjectsTable
          objectProp={currentProp.properties}
          propTitle={currentProp.type}
          messages={messages}
        />
      )
    } else if (currentProp.type === 'array') {
      currentProp.type = `${key.charAt(0).toLocaleUpperCase()}${key.slice(1)}`
      if (currentProp.items) {
        currentComponent = (
          <ArrayTable
            propArray={currentProp.items}
            propTitle={currentProp.type}
            messages={messages}
          />
        )
      }
    }
    currentProp.type =
      currentProp.type.charAt(0).toUpperCase() + currentProp.type.slice(1)
    if (currentComponent) {
      mappedTypes.push(currentComponent)
    }
  }
  return { mappedTypes, mappedProps }
}
