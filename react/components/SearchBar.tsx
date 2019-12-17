import React, { FC, useState } from 'react'
import { InputSearch } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

const SearchBar: FC = () => {
  const {
    navigate,
    query: { q: queryString },
  } = useRuntime()
  const [inputString, setInputString] = useState(queryString || '')

  return (
    <div className="searchBar">
      <InputSearch
        size="small"
        value={inputString}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) => {
          setInputString(e.target.value)
        }}
        onSubmit={(e: any) => {
          e.preventDefault()
          if (inputString !== '') {
            navigate({
              page: 'docs.search',
              query: `q=${inputString}`,
              fetchPage: true,
            })
          }
        }}
      />
    </div>
  )
}

export default SearchBar
