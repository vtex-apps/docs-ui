interface Window extends Window, GlobalThis {
  __RENDER_8_COMPONENTS__: any
}

interface ObjSchemaInterface {
  type: string
  enum?: string[]
  enumNames?: string[]
  properties: Record<string, ObjSchemaInterface>
  items?: Record<string, ObjSchemaInterface>
}
