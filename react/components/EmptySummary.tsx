import React, { FunctionComponent } from 'react'
import { EmptyState } from 'vtex.styleguide'

const EmptySummary: FunctionComponent = () => (
  <div className="w-100 flex justify-center">
    <EmptyState title="Something went wrong">
      <p>We could not fetch the summary for this app.</p>
    </EmptyState>
  </div>
)

export default EmptySummary
