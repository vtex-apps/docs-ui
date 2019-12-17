import React, { FC, useState, Fragment } from 'react'
import { InputSearch } from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

const SearchBar: FC = () => {
  const {
    navigate,
    query: { q: queryString },
  } = useRuntime()
  const [inputString, setInputString] = useState(queryString || '')

  return (
    <Fragment>
      <InputSearch
        placeholder="How to use a shelf"
        value={inputString}
        size="large"
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
    </Fragment>
  )
}

export default SearchBar
