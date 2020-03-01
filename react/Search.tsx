import React, { FC, Fragment } from 'react'
import { prop } from 'ramda'
import { useQuery } from 'react-apollo'

import RightArrow from './components/icons/RightArrow'
import searchEngine from './graphql/search.graphql'
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

const isNotLastResult = (results: [SearchResult], index: number) =>
  index !== results.length - 1

const isFirstResult = (index: number) => index === 0

const Search: FC<Props> = ({ query }) => {
  const queryString = query.q || ''

  const { data, loading } = useQuery(searchEngine, {
    variables: { searchQuery: queryString },
  })

  const results: [SearchResult] = prop('searchEngine', data) || []

  return (
    <Fragment>
      {!loading ? (
        queryString && (
          <div className={`w-100 flex flex-column`}>
            <h1 className="t-heading-3">
              {results.length > 0
                ? `Results for "${queryString}"`
                : 'No results Found'}
            </h1>

            {results && (
              <ul className="w-70-ns list pl0">
                {results.map((result: SearchResult, index: number) => (
                  <li
                    key={index}
                    className={`${
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
