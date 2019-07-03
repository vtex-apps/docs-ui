import React, { FunctionComponent } from 'react'
import { EmptyState } from 'vtex.styleguide'

const EmptyDocs: FunctionComponent = () => (
  <div className="pa7 w-100 flex justify-center">
    <EmptyState title="Something went wrong">
      <p>We could not fetch the documentation on this component right now.</p>
    </EmptyState>
  </div>
)

export default EmptyDocs
