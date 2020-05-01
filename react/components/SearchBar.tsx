import React, { FC, useState } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { InputSearch } from 'vtex.styleguide'

const SearchBar: FC = () => {
  const {
    navigate,
    query: { q: queryString },
  } = useRuntime()

  const [inputString, setInputString] = useState(queryString ?? '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputString !== '') {
      navigate({
        page: 'docs-ui.search',
        query: `q=${inputString}`,
        fetchPage: true,
      })
    }
  }

  return (
    <div className="flex items-center">
      <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
        <InputSearch
          placeholder="Search IO Docs..."
          value={inputString}
          onChange={(e: {
            target: { value: React.SetStateAction<string> }
          }) => {
            setInputString(e.target.value)
          }}
          onSubmit={(e: React.FormEvent) => handleSubmit(e)}
          size="small"
        />
      </form>
    </div>
  )
}

export default SearchBar
