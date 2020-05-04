import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { useQuery } from 'react-apollo'
import { Link } from 'vtex.render-runtime'

import { IO_DOCUMENTATION } from './modules/constantExports'
import { slug } from './modules'
import ConceptListQuery from './graphql/conceptList.graphql'
import Skeleton from './components/Skeleton'
import UnderConstruction from './UnderConstruction'
import RightArrow from './components/icons/RightArrow'

interface Concept {
  title: string
  description: string
  path: string
}

interface QueryResults {
  conceptList: Concept[]
}

function getShortResourcePath(path: string) {
  // the path will always be something like: dist/vtex.docs-graphql/<locale>/Concepts/<fileName>.md
  const PATH_PREFIX = 'dist/vtex.docs-graphql/Concepts/'
  // the <locale> section will always be one of 'en/', 'pt/', 'es/'
  const LOCALE_LENGTH = 3
  const FILE_EXTENSION = '.md'
  return path.substring(
    PATH_PREFIX.length + LOCALE_LENGTH,
    path.length - FILE_EXTENSION.length
  )
}

const ConceptList: FC = () => {
  const { data, loading, error } = useQuery<QueryResults>(ConceptListQuery, {
    variables: {
      appName: IO_DOCUMENTATION,
      locale: 'en',
    },
  })

  if (loading) {
    return <Skeleton />
  }

  if (error || data?.conceptList.length === 0) {
    return <UnderConstruction />
  }

  return (
    <div>
      <h1 className="t-heading-1 mb6">
        <FormattedMessage id="docs-ui/concepts" />
      </h1>
      <p className="t-body c-on-base w-70-ns">
        <FormattedMessage id="docs-ui/concepts-description" />
      </p>
      <div>
        {data?.conceptList.map((concept: Concept) => (
          <article
            key={slug(concept.description)}
            className="flex flex-column justify-center w-70-l mv4 no-underline">
            <h2 className="t-heading-4 mb3">{concept.title}</h2>
            <Link
              to={`/docs/concepts/${getShortResourcePath(concept.path)}`}
              className="flex items-center mb5 c-emphasis link no-underline dim">
              <span className="mr4">
                <FormattedMessage id="docs-ui/read-more" />
              </span>
              <RightArrow />
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ConceptList
