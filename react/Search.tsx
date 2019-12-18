import React, { FC, Fragment } from 'react'
import { prop } from 'ramda'
import { useQuery } from 'react-apollo'
import RightArrow from './components/icons/RightArrow'
import searchEngine from './graphql/search.graphql'

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

  const { data } = useQuery(searchEngine, {
    variables: { searchQuery: queryString },
  })

  const results: [SearchResult] = prop('searchEngine', data) || []

  return (
    <Fragment>
      <h1 className="center">
        Results for <span className="c-emphasis">{queryString}</span>
      </h1>
      <ul className="list pl0 center mt5 mw8">
        {results
          ? results.map((result: any, index: number) => (
              <li key={index} className="mh8 mv8">
                <h2>{result.title}</h2>
                <p>{result.snippet}</p>
                <a
                  className="link c-emphasis no-underline t-body ml-auto flex items-center dim"
                  href={result.link}>
                  <div className="flex flex-column flex-row-l">
                    <span className="dn db-l">Read More</span>
                    <div className="ml5">
                      <RightArrow />
                    </div>
                  </div>
                </a>
              </li>
            ))
          : null}
      </ul>
    </Fragment>
  )
}

export default Search
