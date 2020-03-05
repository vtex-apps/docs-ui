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
    title: TITLE_LANGUAGES[lang].title,
    /** Fixed width */
    width: '3rem',
  },
  {
    id: 'description',
    title: TITLE_LANGUAGES[lang].description,
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
    <div className="pt6">
      {propTitle.charAt(0).toUpperCase() + propTitle.slice(1)} Values
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
