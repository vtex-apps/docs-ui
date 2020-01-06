import React, { FC, useState } from 'react'
import SearchIcon from './icons/SearchIcon'
import { useRuntime } from 'vtex.render-runtime'

const SearchBar: FC = () => {
  const {
    navigate,
    query: { q: queryString },
  } = useRuntime()
  const [inputString, setInputString] = useState(queryString || '')

  return (
    <div className="mh4">
      <form
        onSubmit={(e: any) => {
          e.preventDefault()
          if (inputString !== '') {
            navigate({
              page: 'docs.search',
              query: `q=${inputString}`,
              fetchPage: true,
            })
          }
        }}>
        <div className="flex center searchBarContainer items-center pa3">
          <input
            type="search"
            className="searchBar pa1 bg-transparent b--none"
            placeholder="Search IO Docs..."
            value={inputString}
            onChange={(e: {
              target: { value: React.SetStateAction<string> }
            }) => {
              setInputString(e.target.value)
            }}
          />
          <button type="submit" className="searchSubmitButton">
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
