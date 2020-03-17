import React, { FC } from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'
import { toPairs } from 'ramda'
import EnumTable from './EnumTable'

const lang = 'en'
const customTypes:FC[] = []

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
    cellRenderer: ({data}: {data: string}) => {
        return <span className={'pv1 ph2 mw6 br2 bg-muted-5 ba b--muted-3 t-code c-emphasis'}>{data}</span>
    },
    /** Title that will appear on Header */
    title: <span className={'t-body fw5 c-muted-1 bw1 pa2 pb3 b--muted-3 tl'}>{TITLE_LANGUAGES[lang].title}</span>,
    /** Fixed width */
    maxWidth: 20,
  },
  {
    id: 'description',
    cellRenderer: ({data}: {data: string}) => {
      return <span className={'pv1 ph2 br2 pv7'}>{data}</span>
    },
    title: <p className={'t-body fw5 c-muted-1 bw1 pa2 pb3 b--muted-3 tl'}>{TITLE_LANGUAGES[lang].description}</p>,
    /** Fixed width */
    maxWidth: 50,
  },
  {
    id: 'type',
    cellRenderer: ({data}: {data: string}) => {
      return <span className={'pv1 ph2 mw6 br2 bg-muted-5 ba b--muted-3 t-code c-emphasis'}>{data}</span>
    },
    title: <p className={'t-body fw5 c-muted-1 bw1 pa2 pb3 b--muted-3 tl'}>{TITLE_LANGUAGES[lang].type}</p>,
  },
  {
    id: 'default',
    cellRenderer: ({data}: {data: string}) => {
      return <span className={'pv1 ph2 mw6 br2 bg-muted-5 ba b--muted-3 t-code c-emphasis'}>{data}</span>
    },
    title: <p className={'t-body fw5 c-muted-1 tl'}>{TITLE_LANGUAGES[lang].default}</p>,
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

let mapCustomTypes = (propsObj: { [key: string]: { [key: string]: string } }, messages: any) => {
  for (let key in propsObj) {
    let customProp = propsObj[key]
    if (customProp.enum) {
      propsObj[key].type = `${key.charAt(0).toLocaleUpperCase()}${key.slice(1)}Enum`
      customTypes.push(<EnumTable enumProps = {customProp} messages = {messages} propTitle = {key}/>)
    }
  }
  return propsObj
}


const PropsTable: FC<PropTableProps> = ({ fetchedProps, fetchedMessages }) => {
  const mappedProps = mapCustomTypes(fetchedProps, fetchedMessages)
  let data = mapPropsToColumns(mappedProps, lang, fetchedMessages)
  const measures = useMeasures({ size: data.length + 1|| 3 })
  const { sizedColumns } = useProportion({ columns, ratio: [1, 0.5, 0.5, 1] })
  return (
    <div>
      <div className={'overflow-x-auto'}>
      <Table
        measures={measures}
        items={data}
        columns={sizedColumns}
        highlightOnHover
      />
      </div>
      {customTypes}
    </div>
  )
}

interface PropTableProps {
  fetchedProps: { [key: string]: { [key: string]: string } },
  fetchedMessages: { [key: string]: { [key: string]: string } }
}

export default PropsTable
