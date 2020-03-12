import { FC, useEffect } from 'react'
import { initialize, pageview, ga } from 'react-ga'

function pageView() {
  if (typeof ga() === 'undefined') {
    initialize('UA-150301985-1')
  }
  pageview(window.location.pathname + window.location.search)
}

const PageView: FC = () => {
  useEffect(() => pageView())

  return null
}

export default PageView
