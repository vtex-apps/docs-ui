import React, { FC } from 'react'
import { useQuery } from 'react-apollo'
import { ButtonPlain } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import releaseNotes from './graphql/releaseNotes.graphql'

interface ReleseNotesQuery {
  releaseNotes: {
    __typename: string
    edges: Array<{
      cursor: string
      node: {
        id: string
        title: string
        description: string
        date: string
        markdown: string
      }
    }>
    pageInfo: {
      hasPreviousPage: boolean
      hasNextPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}

const isNotLastResult = (results: any[], index: number) =>
  index !== results.length - 1

const ReleaseNotes: FC = () => {
  const { data, loading, fetchMore } = useQuery<ReleseNotesQuery>(
    releaseNotes,
    {
      fetchPolicy: 'cache-and-network',
    }
  )

  return (
    <section className="w-100 flex flex-column">
      <h1 className="t-heading-3">
        <FormattedMessage id="docs-ui/release-notes" />
      </h1>

      <p className="c-on-base lh-copy">
        <FormattedMessage id="docs-ui/release-notes-description" />
      </p>

      <ul className="w-50-ns pl6 mt0">
        {data?.releaseNotes?.edges.map((edge, index) => (
          <li
            key={edge.cursor}
            className={`${
              isNotLastResult(data!.releaseNotes.edges, index) || loading
                ? 'bb b--muted-4'
                : ''
            }`}>
            <a
              className={`link c-emphasis no-underline mv4 t-body ml-auto
                flex items-center dim`}
              href={`/docs/releases/${edge.node.id}/README`}>
              {edge.node.title.replace(
                /(VTEX IO Release Notes - |VTEX IO Highlights - )/,
                ''
              )}
            </a>
          </li>
        ))}
        {loading && <ListSkeleton />}
      </ul>

      {data?.releaseNotes?.pageInfo.hasNextPage && (
        <div className="mb6">
          <ButtonPlain
            onClick={() => {
              const after =
                data?.releaseNotes?.edges[data?.releaseNotes?.edges.length - 1]
                  .cursor
              fetchMore({
                variables: {
                  after,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  const newEdges = fetchMoreResult!.releaseNotes!.edges
                  const { pageInfo } = fetchMoreResult!.releaseNotes!

                  return newEdges.length
                    ? {
                        releaseNotes: {
                          __typename: prev.releaseNotes.__typename,
                          edges: [...prev.releaseNotes.edges, ...newEdges],
                          pageInfo,
                        },
                      }
                    : prev
                },
              })
            }}>
            <FormattedMessage id="docs-ui/see-previous-releases" />
          </ButtonPlain>
        </div>
      )}
    </section>
  )
}

function SkeletonLine({ big = false }) {
  return (
    <li className="bb b--muted-4">
      <span className="dib bg-muted-3 o-60 t-body mv4 skeleton-shimmer transparent-text">
        {big ? 'Week 00/0000' : 'Week 00&00/0000'}
      </span>
    </li>
  )
}

function ListSkeleton() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
        <SkeletonLine key={index} big={!!(index % 2)} />
      ))}
    </>
  )
}

export default ReleaseNotes
