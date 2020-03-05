import React, { FC, Fragment } from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'
import { toPairs } from 'ramda'
import EnumTable from './EnumTable'
// import 'vtex-tachyons'

const lang = 'en'

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

function mapPropsToColumns(propsObj: { [key: string]: { [key: string]: string } }, lang: string, messages: { [key: string]: { [key: string]: string } }) {
  return toPairs(propsObj).map(([key, { description, type, default: defaultValue }]: any) => ({
    title: key,
    description: messages[lang][description],
    type: type.charAt(0).toUpperCase() + type.slice(1),
    default: defaultValue || 'null',
  })
}

let mapCustomTypes = (propsObj: { [key: string]: { [key: string]: string } }, messages: any, data: {
  title: any;
  description: string;
  type: any;
  default: any;
}[]) => {
  let customTypes = []
  console.log(propsObj.enum)
  for (var key in propsObj) {
    var customProp = propsObj[key]
    if (customProp.enum) {
      console.log('prop with enum - ', customProp, key)
      customTypes.push(<EnumTable enumProps = {customProp} messages = {messages} propTitle = {key}/>)
    }
  }
  return customTypes
}


const PropsTable: FC<PropTableProps> = ({ fetchedProps, fetchedMessages }) => {
  let data = mapPropsToColumns(fetchedProps, lang, fetchedMessages)
  console.log('data:', data)
  const measures = useMeasures({ size: data.length || 3 })
  const { sizedColumns } = useProportion({ columns, ratio: [1, 0.5, 0.5, 1] })
  const customTypesTables = mapCustomTypes(fetchedProps, fetchedMessages, data)
  return (
    <Fragment>
      <Table
        measures={measures}
        items={data}
        columns={sizedColumns}
        highlightOnHover
      />
      {customTypesTables}
    </Fragment>
  )
}

interface PropTableProps {
  fetchedProps: { [key: string]: { [key: string]: string } },
  fetchedMessages: { [key: string]: { [key: string]: string } }
}

export default PropsTable
