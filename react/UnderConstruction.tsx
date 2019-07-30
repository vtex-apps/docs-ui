import React, { FC } from 'react'
import { EmptyState } from 'vtex.styleguide'

import PageLayoutContainer from './components/PageLayoutContainer'

const UnderConstruction: FC = () => {
  return (
    <PageLayoutContainer>
      <div className="min-vh-100 w-100 flex justify-center items-center">
        <EmptyState title="Under Construction">
          <p>This page is still being developed.</p>
          <p>Come back in a bit and something awesome should be here!</p>
        </EmptyState>
      </div>
    </PageLayoutContainer>
  )
}

export default UnderConstruction
