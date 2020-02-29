import React from 'react'
import '../styles.global.css'

const baseSkeletonPiece = 'pa3 br2 relative overflow-hidden'

const TitleLine = () => (
  <div
    className={`${baseSkeletonPiece} bg-muted-3 w-70 mb7`}
    style={{ height: `${32}px` }}>
    <div className="skeleton-shimmer" />
  </div>
)

const LineOne = () => (
  <div
    className={`${baseSkeletonPiece} bg-muted-3 mv3 w-100 o-80`}
    style={{ height: `${20}px` }}>
    <div className="skeleton-shimmer" />
  </div>
)

const LineTwo = () => (
  <div
    className={`${baseSkeletonPiece} bg-muted-3 mv3 w-80 o-60`}
    style={{ height: `${20}px` }}>
    <div className="skeleton-shimmer" />
  </div>
)

const Skeleton = () => {
  return (
    <div className="w-100 w-80-l" style={{ maxWidth: '680px' }}>
      <TitleLine />

      <LineOne />
      <LineTwo />

      <LineOne />
      <LineTwo />

      <LineOne />
      <LineTwo />

      <LineOne />
      <LineTwo />

      <LineOne />
      <LineTwo />

      <LineOne />
      <LineTwo />

      <LineOne />
      <LineTwo />

      <LineOne />
      <LineTwo />

      <LineOne />
      <LineTwo />
    </div>
  )
}

export default Skeleton
