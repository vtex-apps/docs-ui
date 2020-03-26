interface ObjSchemaInterface {
  type: string
  enum?: string[]
  enumNames?: string[]
  properties: Record<string, ObjSchemaInterface>
  items?: Record<string, ObjSchemaInterface>
}
