import React from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'
import { any } from 'ramda'
// import 'vtex-tachyons'

const MOCKED_PROPS = {
  dynamicSrc: {
    title: 'editor.dynamiciframe.dynamicSrc.title',
    description: 'editor.dynamiciframe.dynamicSrc.description',
    type: 'string',
    default: null,
  },
  width: {
    title: 'editor.dynamiciframe.width.title',
    type: 'number',
    default: null,
  },
  height: {
    title: 'editor.dynamiciframe.height.title',
    type: 'number',
    default: null,
  },
  title: {
    title: 'editor.dynamiciframe.title.title',
    type: 'string',
    default: null,
  },
  __proto__: Object,
}

const MOCKED_MESSAGES = {
en: {
    'editor.iframe.title': "Iframe",
    'editor.iframe.src.description': "Source url of the iframe",
    'editor.iframe.src.title': "Src",
    'editor.iframe.height.title': "Height",
    'editor.iframe.width.title': "Width",
    'editor.iframe.title.title': "Title",
    'editor.dynamiciframe.title': "Dynamic Iframe",
    'editor.dynamiciframe.title.title': "Title",
    'editor.dynamiciframe.dynamicSrc.description': "url to be used by iframe, use {param} for dynamic parameters",
    'editor.dynamiciframe.dynamicSrc.title': "Prepend",
    'editor.dynamiciframe.height.title': "Height",
    'editor.dynamiciframe.width.title': "Width",
    __proto__: Object
},
es: {
    'editor.iframe.title': "Iframe",
    'editor.iframe.src.description': "Dirección de origen del iframe",
    'editor.iframe.src.title': "Src",
    'editor.iframe.height.title': "Altura",
    'editor.iframe.width.title': "Longitud",
    __proto__: Object
},
pt: {
    'editor.iframe.title': "Iframe",
    'editor.iframe.src.description': "Endereço de origem do iframe",
    'editor.iframe.src.title': "Src",
    'editor.iframe.height.title': "Altura",
    'editor.iframe.width.title': "Comprimento",
    __proto__: Object
},
__proto__: Object
}

/** Columns definition, must be an array */
const columns = [
  {
    /** Prop that this column represents */
    id: 'title',
    /** Title that will appear on Header */
    title: 'Title',
    /** Fixed width */
    width: '3rem',
  },
  {
    id: 'description',
    title: 'Description',
  },
  {
    id: 'type',
    title: 'Type',
  },
  {
    id: 'default',
    title: 'Default Value',
  },
]

function mapPropsToColumns (propsObj: any) {
  return Object.values(propsObj).map((propMeta: any) => ({
    ...propMeta,
    default: propMeta.default || 'null',
  })
}

function mapMessages (props: any) {
  console.log(props)
  for (const propValue in Object.keys(props)) {
    console.log(props[propValue])
  }
}

const dataBeforeMessages = mapPropsToColumns(MOCKED_PROPS)
mapMessages(dataBeforeMessages)

// const data =

function PropsTable() {
  /** The useTableMeasures hook will be discussed on the Measures section */
  const measures = useMeasures({ size: dataBeforeMessages.length })
  const { sizedColumns } = useProportion({ columns, ratio: [1, 1, 0.5, 1] })
  return (
    <Table
      measures={measures}
      items={dataBeforeMessages}
      columns={sizedColumns}
      highlightOnHover
    />
  )
}
;<PropsTable />

export default PropsTable
