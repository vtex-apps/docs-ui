import React, { FC } from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'
import { toPairs } from 'ramda'
import { titleCell, codeCell } from './TableCellComponents'
import { FormattedMessage } from 'react-intl'
import { mapCustomTypes } from '../hooks/mapCustomTypes'

const customTypes: JSX.Element[] = []

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
        <FormattedMessage id="DocProp.table.title"></FormattedMessage>
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
        <FormattedMessage id="DocProp.table.type"></FormattedMessage>
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

const ArrayTable: FC<ArrayTableProps> = ({
  propArray,
  propTitle,
  messages,
}) => {
  const customTypes = mapCustomTypes(propArray, messages)
  const data = mapArrayToNames(customTypes.mappedProps)
  const measures = useMeasures({ size: data.length + 1 || 3 })
  const { sizedColumns } = useProportion({ columns, ratio: [0.5, 0.5] })
  return (
    <div className={'overflow-x-auto'}>
      <div className={'t-body c-on-base mt0 lh-copy mb6 pt7 pb0'}>
        <FormattedMessage id="DocProp.arrayTable.title"></FormattedMessage>
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
        {customTypes.mappedTypes}
      </div>
    </div>
  )
}

interface ArrayTableProps {
  propArray: Record<string, ObjSchemaInterface>
  messages: Record<string, Record<string, string>>
  propTitle: string
}

export default ArrayTable
