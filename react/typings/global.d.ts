interface Window extends Window, GlobalThis {
  __RENDER_8_COMPONENTS__: any
  __RUNTIME__: any
}

interface ObjSchemaInterface {
  type: string
  enum?: string[]
  enumNames?: string[]
  properties: Record<string, ObjSchemaInterface>
  items?: Record<string, ObjSchemaInterface>
}

interface ComponentDataInterface {
  schema: Record<string, ObjSchemaInterface>
  messages: Record<string, Record<string, string>>
}

interface CustomComponent {
  component?: JSX.Element
  typeName?: string
}
