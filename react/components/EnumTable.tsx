import React, { FC, Fragment } from 'react'
import {
  EXPERIMENTAL_Table as Table,
  EXPERIMENTAL_useTableMeasures as useMeasures,
  EXPERIMENTAL_useTableProportion as useProportion,
} from 'vtex.styleguide'

const lang = 'en'

const TITLE_LANGUAGES: { [key: string]: { [key: string]: string } } = {
  en: {
    title: 'Name',
    description: 'Description',
  },
  es: {
    title: 'Nombre',
    description: 'Descripción',
  },
  pt: {
    title: 'Nome',
    description: 'Descrição',
  },
}
/** Columns definition, must be an array */
const columns = [
  {
    /** Prop that this column represents */
    id: 'title',
    /** Title that will appear on Header */
    title: (
      <p className={'t-body fw5 c-muted-1 bb bw1 pa2 pb3 b--muted-3 tl'}>
        {TITLE_LANGUAGES[lang].title}
      </p>
    ),
    cellRenderer: ({ data }: { data: string }) => {
      return (
        <span
          className={
            'pv1 ph2 br2 bg-muted-5 ba mv7 b--muted-3 t-code c-emphasis'
          }>
          {data}
        </span>
      )
    },
    /** Fixed width */
    width: '3rem',
  },
  {
    id: 'description',
    title: (
      <p className={'t-body fw5 c-muted-1 bb bw1 pa2 pb3 b--muted-3 tl'}>
        {TITLE_LANGUAGES[lang].description}
      </p>
    ),
  },
]

function mapEnumToNames(
  keys: string[],
  names: string[],
  messages: { [key: string]: { [key: string]: string } }
) {
  return keys.map((key, index) => ({
    title: key,
    description: messages[lang][names[index]],
  }))
}

const EnumTable: FC<EnumTableProps> = ({ enumProps, messages, propTitle }) => {
  const data = mapEnumToNames(enumProps.enum, enumProps.enumNames, messages)
  const measures = useMeasures({ size: data.length || 3 })
  const { sizedColumns } = useProportion({ columns, ratio: [0.5, 1] })
  return (
    <div className={'overflow-x-auto'}>
      <div className={'t-body c-on-base mt0 lh-copy mb6'}>
        Here are the possible values of{' '}
        <span
          className={
            'pv1 ph2 mw6 br2 bg-muted-5 ba b--muted-3 t-code c-emphasis'
          }>
          {propTitle.charAt(0).toUpperCase() + propTitle.slice(1)}{' '}
        </span>
      </div>
      <Table
        measures={measures}
        items={data}
        columns={sizedColumns}
        highlightOnHover
      />
    </div>
  )
}

interface EnumTableProps {
  enumProps: { [key: string]: string }
  messages: { [key: string]: { [key: string]: string } }
  propTitle: string
}

export default EnumTable
