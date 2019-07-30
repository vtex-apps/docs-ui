import React, { FC } from 'react'
import { EmptyState } from 'vtex.styleguide'

const UnderConstruction: FC = () => (
  <div className="min-vh-100 w-100 flex justify-center items-center">
    <EmptyState title="Under Construction">
      <p>This page is still being developed.</p>
      <p>Come back in a bit and something awesome should be here!</p>
    </EmptyState>
  </div>
)

export default UnderConstruction
