import React, { FC } from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'
import { toPairs } from 'ramda'
// import EnumTable from './EnumTable'
import ObjectsTable from './ObjectsTable'
import { titleCell, codeCell } from './TableCellComponents'

const lang = 'en'
const customTypes: JSX.Element[] = []

const TITLE_LANGUAGES: { [key: string]: { [key: string]: string } } = {
  en: {
    title: 'Name',
    type: 'Type',
  },
  es: {
    title: 'Nombre',
    type: 'Tipo',
  },
  pt: {
    title: 'Nome',
    type: 'Tipo',
  },
}
/** Columns definition, must be an array */
const columns = [
  {
    /** Prop that this column represents */
    id: 'title',
    cellRenderer: ({ data }: { data: string }) => {
      return titleCell({ title: data })
    },
    /** Title that will appear on Header */
    title: (
      <span className={'t-body fw5 c-muted-1 bw1 pa2 pb3 b--muted-3 tl'}>
        {TITLE_LANGUAGES[lang].title}
      </span>
    ),
    /** Fixed width */
    maxWidth: 20,
  },
  {
    id: 'type',
    cellRenderer: ({ data }: { data: string }) => {
      return codeCell({ code: data })
    },
    title: (
      <p className={'t-body fw5 c-muted-1 bw1 pa2 pb3 b--muted-3 tl'}>
        {TITLE_LANGUAGES[lang].type}
      </p>
    ),
  },
]

function mapArrayToNames(arrayProp: Record<string, ObjSchemaInterface>) {
  return toPairs(arrayProp).map(([key, { type }]: any) => ({
    title: key,
    type: type,
  }))
}
let mapCustomTypes = (arrayProp: Record<string, ObjSchemaInterface>) => {
  for (let key in arrayProp) {
    let customProp = arrayProp[key]
    // if (customProp.enum) {
    //   objectProp[key].type = `${key.charAt(0).toLocaleUpperCase()}${key.slice(1)}Enum`
    //   customTypes.push(<EnumTable enumProps = {customProp} messages = {messages} propTitle = {key}/>)
    // }
    if (customProp.type === 'object') {
      arrayProp[key].type = `${key.charAt(0).toLocaleUpperCase()}${key.slice(
        1
      )}`
      customTypes.push(
        <ObjectsTable objectProp={customProp.properties} propTitle={key} />
      )
    }
    if (customProp.type === 'array') {
      arrayProp[key].type = `${key.charAt(0).toLocaleUpperCase()}${key.slice(
        1
      )}`
      if (customProp.items) {
        customTypes.push(
          <ArrayTable arrayProp={customProp.items} propTitle={key} />
        )
      }
    }
  }
  return arrayProp
}

const ArrayTable: FC<ArrayTableProps> = ({ arrayProp, propTitle }) => {
  const data = mapArrayToNames(mapCustomTypes(arrayProp))
  const measures = useMeasures({ size: data.length + 1 || 3 })
  const { sizedColumns } = useProportion({ columns, ratio: [0.5, 0.5] })
  return (
    <div className={'overflow-x-auto'}>
      <div className={'t-body c-on-base mt0 lh-copy mb6 pt7 pb0'}>
        Here are the items/properties of the array{' '}
        <span
          className={
            'pv1 ph2 mw6 br2 bg-muted-5 ba b--muted-3 t-code c-emphasis'
          }>
          {propTitle.charAt(0).toUpperCase() + propTitle.slice(1)}
        </span>
        <div>
          <Table
            measures={measures}
            items={data}
            columns={sizedColumns}
            highlightOnHover
          />
        </div>
        {customTypes}
      </div>
    </div>
  )
}

interface ArrayTableProps {
  arrayProp: Record<string, ObjSchemaInterface>
  propTitle: string
}

export default ArrayTable
