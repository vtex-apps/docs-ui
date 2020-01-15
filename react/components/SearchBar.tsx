import React, { FC, useState } from 'react'
import WhiteSearchIcon from './icons/WhiteSearchIcon'
import { useRuntime } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { InputSearch } from 'vtex.styleguide'

const SearchBar: FC = () => {
  const { isMobile } = useDevice()
  const {
    navigate,
    query: { q: queryString },
  } = useRuntime()

  const [inputString, setInputString] = useState(queryString || '')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (inputString !== '') {
      navigate({
        page: 'docs.search',
        query: `q=${inputString}`,
        fetchPage: true,
      })
    }
  }
  if (isMobile) {
    return (
      <div className="pt10 ph8 w-100 center flex flex-column">
        <InputSearch
          placeholder="Search IO Docs..."
          value={inputString}
          onChange={(e: {
            target: { value: React.SetStateAction<string> }
          }) => {
            setInputString(e.target.value)
          }}
          onSubmit={(e: any) => handleSubmit(e)}
          size="large"
        />
      </div>
    )
  }

  return (
    <div className="mh4">
      <form onSubmit={(e: any) => handleSubmit(e)}>
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
            <WhiteSearchIcon />
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
