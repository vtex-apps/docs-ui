import React from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'
// import 'vtex-tachyons'

const lang = __RUNTIME__.culture.language || 'en'

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

const MOCKED_MESSAGES: { [key: string]: { [key: string]: string } } = {
  en: {
    'editor.iframe.title': 'Iframe',
    'editor.iframe.src.description': 'Source url of the iframe',
    'editor.iframe.src.title': 'Src',
    'editor.iframe.height.title': 'Height',
    'editor.iframe.width.title': 'Width',
    'editor.iframe.title.title': 'Title',
    'editor.dynamiciframe.title': 'Dynamic Iframe',
    'editor.dynamiciframe.title.title': 'Title',
    'editor.dynamiciframe.dynamicSrc.description':
      'url to be used by iframe, use {param} for dynamic parameters',
    'editor.dynamiciframe.dynamicSrc.title': 'Prepend',
    'editor.dynamiciframe.height.title': 'Height',
    'editor.dynamiciframe.width.title': 'Width',
  },
  es: {
    'editor.iframe.title': 'Iframe',
    'editor.iframe.src.description': 'Dirección de origen del iframe',
    'editor.iframe.src.title': 'Src',
    'editor.iframe.height.title': 'Altura',
    'editor.iframe.width.title': 'Longitud',
  },
  pt: {
    'editor.iframe.title': 'Iframe',
    'editor.iframe.src.description': 'Endereço de origem do iframe',
    'editor.iframe.src.title': 'Src',
    'editor.iframe.height.title': 'Altura',
    'editor.iframe.width.title': 'Comprimento',
    'editor.dynamiciframe.title': 'Iframe Dinâmico',
    'editor.dynamiciframe.title.title': 'Título',
    'editor.dynamiciframe.dynamicSrc.description':
      'url a ser usada pelo iframe, use {param} para parâmetros dinâmicos',
    'editor.dynamiciframe.dynamicSrc.title': 'Prepend',
    'editor.dynamiciframe.height.title': 'Altura',
    'editor.dynamiciframe.width.title': 'Comprimento',
  },
}

const TITLE_LANGUAGES: { [key: string]: { [key: string]: string }} = {
  en: {
    title: 'Name',
    description: 'Description',
    type: 'Type',
    default: 'Default Value'
  },
  es: {
    title: 'Nombre',
    description: 'Descripción',
    type: 'Tipo',
    default: 'Valor Default'
  },
  pt: {
    title: 'Nome',
    description: 'Descrição',
    type: 'Tipo',
    default: 'Valor Default'
  }
}

/** Columns definition, must be an array */
const columns = [
  {
    /** Prop that this column represents */
    id: 'title',
    /** Title that will appear on Header */
    title: TITLE_LANGUAGES[lang].title,
    /** Fixed width */
    width: '3rem',
  },
  {
    id: 'description',
    title: TITLE_LANGUAGES[lang].description,
  },
  {
    id: 'type',
    title: TITLE_LANGUAGES[lang].type,
  },
  {
    id: 'default',
    title: TITLE_LANGUAGES[lang].default,
  },
]

function mapPropsToColumns(propsObj: any, lang: string) {
  return Object.values(propsObj).map(({ title, description, type, default: defaultValue }: any) => ({
      title: MOCKED_MESSAGES[lang][title],
      description: MOCKED_MESSAGES[lang][description],
      type,
      default: defaultValue || 'null',
  })
}

const dataBeforeMessages = mapPropsToColumns(MOCKED_PROPS, lang)

// const data =

function PropsTable() {
  /** The useTableMeasures hook will be discussed on the Measures section */
  const measures = useMeasures({ size: dataBeforeMessages.length || 3 })
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
