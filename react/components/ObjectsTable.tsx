import React, { FC } from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'
import { toPairs } from 'ramda'
// import EnumTable from './EnumTable'
import ArrayTable from './ArrayTable'
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

function mapObjectsToNames(objectProp: Record<string, ObjSchemaInterface>) {
  return toPairs(objectProp).map(([key, { type }]: any) => ({
    title: key,
    type: type,
  }))
}

let mapCustomTypes = (objectProp: Record<string, ObjSchemaInterface>) => {
  for (let key in objectProp) {
    let customProp = objectProp[key]
    // if (customProp.enum) {
    //   objectProp[key].type = `${key.charAt(0).toLocaleUpperCase()}${key.slice(1)}Enum`
    //   customTypes.push(<EnumTable enumProps = {customProp} messages = {messages} propTitle = {key}/>)
    // }
    if (customProp.type === 'object') {
      objectProp[key].type = `${key.charAt(0).toLocaleUpperCase()}${key.slice(
        1
      )}`
      customTypes.push(
        <ObjectsTable objectProp={customProp.properties} propTitle={key} />
      )
    }
    if (customProp.type === 'array') {
      objectProp[key].type = `${key.charAt(0).toLocaleUpperCase()}${key.slice(
        1
      )}`
      if (customProp.items) {
        customTypes.push(
          <ArrayTable arrayProp={customProp.items} propTitle={key} />
        )
      }
    }
  }
  return objectProp
}

const ObjectsTable: FC<ObjectTableProps> = ({ objectProp, propTitle }) => {
  const data = mapObjectsToNames(mapCustomTypes(objectProp))
  const measures = useMeasures({ size: data.length + 1 || 3 })
  const { sizedColumns } = useProportion({ columns, ratio: [0.5, 0.5] })
  return (
    <div className={'overflow-x-auto'}>
      <div className={'t-body c-on-base mt0 lh-copy mb6 pt7 pb0'}>
        Here are the properties of the object{' '}
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

interface ObjectTableProps {
  objectProp: Record<string, ObjSchemaInterface>
  propTitle: string
}

export default ObjectsTable
