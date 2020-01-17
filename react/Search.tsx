import React, { FC, Fragment } from 'react'
import { prop } from 'ramda'
import { useQuery } from 'react-apollo'

import { useDevice } from 'vtex.device-detector'
import RightArrow from './components/icons/RightArrow'
import searchEngine from './graphql/search.graphql'
import SearchBar from './components/SearchBar'
import Skeleton from './components/Skeleton'

interface Props {
  query: {
    q: string
  }
}

interface SearchResult {
  title: string
  snippet: string
  link: string
}

const Search: FC<Props> = ({ query }) => {
  const queryString = query.q || ''

  const { data, loading } = useQuery(searchEngine, {
    variables: { searchQuery: queryString },
  })

  const { isMobile } = useDevice()

  const results: [SearchResult] = prop('searchEngine', data) || []

  const isNotLastResult = (results: [SearchResult], index: number) =>
    index !== results.length - 1

  const isFirstResult = (index: number) => index === 0

  return (
    <Fragment>
      {isMobile && <SearchBar />}
      {!loading ? (
        queryString && (
          <div className={`pv6 w-100 flex flex-column`}>
            <h1
              className={`t-heading-1 right ph6 ${isMobile ? '' : 'center'}`}
              style={{ fontSize: `${isMobile ? '24px' : '48px'}` }}>
              {results.length > 0
                ? `Results for "${queryString}"`
                : 'No Results Found'}
            </h1>

            {results && (
              <ul className="w-100 list pl0 center mw8">
                {results.map((result: SearchResult, index: number) => (
                  <li
                    key={index}
                    className={`mh8 ${
                      isFirstResult(index) ? '' : 'mv8'
                    } searchResult ${
                      isNotLastResult(results, index)
                        ? 'searchResultBorder'
                        : ''
                    }`}>
                    <h2
                      className="t-heading-2 searchTitle"
                      style={{ wordBreak: 'break-word' }}>
                      {result.title}
                    </h2>
                    <p className="t-body searchSnippet">{result.snippet}</p>
                    <a
                      className={`link c-emphasis no-underline t-body ml-auto
                flex items-center dim`}
                      href={result.link}>
                      <div className="flex flex-column flex-row di">
                        <span>Read More</span>
                        <div className="ml5">
                          <RightArrow />
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      ) : (
        <Skeleton />
      )}
    </Fragment>
  )
}

export default Search
