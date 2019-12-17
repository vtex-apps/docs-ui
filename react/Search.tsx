import React, { FC, useState, useEffect, Fragment } from 'react'
import { Link, Card } from 'vtex.styleguide'
import { cseSearch } from './clients/cse'

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
  const [results, setResults] = useState<SearchResult[]>([])
  const queryString = query.q || ''
  useEffect(() => {
    ;(async () => {
      setResults(await cseSearch(queryString))
    })()
  }, [query, queryString])
  return (
    <Fragment>
      <h1 className="center">
        Results for <span className="c-emphasis">{queryString}</span>
      </h1>
      <ul className="list pl0 center mt8 mw8">
        {results
          ? results.map((result: any, index: number) => (
              <li key={index} className="mh8 mv8">
                <div>
                  <Link href={result.link}>
                    <Card>
                      <div className="result-card">
                        <h2>{result.title}</h2>
                        <p>{result.snippet}</p>
                      </div>
                    </Card>
                  </Link>
                </div>
              </li>
            ))
          : null}
      </ul>
    </Fragment>
  )
}

export default Search
