import React, { FC } from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'
import { descriptionCell, titleCell } from './TableCellComponents'
import { FormattedMessage } from 'react-intl'

const lang = 'en'

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
    id: 'description',
    cellRenderer: ({ data }: { data: string }) => {
      return descriptionCell({ description: data })
    },
    title: (
      <p className={'t-body fw5 c-muted-1 bw1 pa2 pb3 b--muted-3 tl'}>
        <FormattedMessage id="DocProp.table.type"></FormattedMessage>
      </p>
    ),
  },
]

function mapEnumToNames(
  keys: string[],
  names: string[],
  messages: Record<string, Record<string, string>>
) {
  return keys.map((key: string, index: number) => ({
    title: key,
    description: messages[lang][names[index]],
  }))
}

const EnumTable: FC<EnumTableProps> = ({ enumProps, messages, propTitle }) => {
  let data: { title: string; description: string }[] = []
  if (enumProps.enum && enumProps.enumNames) {
    data = mapEnumToNames(enumProps.enum, enumProps.enumNames, messages)
  }
  const measures = useMeasures({ size: data.length + 1 || 3 })
  const { sizedColumns } = useProportion({ columns, ratio: [0.5, 0.5] })
  return (
    <div className={'overflow-x-auto'}>
      <div className={'t-body c-on-base mt1 lh-copy mb1 pb1'}>
        <div className={'mb4'}>
          <FormattedMessage id="DocProp.enumTable.title"></FormattedMessage>
          <span
            className={
              'pv1 ph2 mw6 br2 bg-muted-5 ba b--muted-3 t-code c-emphasis'
            }>
            {propTitle.charAt(0).toUpperCase() + propTitle.slice(1)}
          </span>
        </div>
        <div className={'mb7'}>
          <Table
            measures={measures}
            items={data}
            columns={sizedColumns}
            highlightOnHover
          />
        </div>
      </div>
    </div>
  )
}

interface EnumTableProps {
  enumProps: ObjSchemaInterface
  messages: Record<string, Record<string, string>>
  propTitle: string
}

export default EnumTable
