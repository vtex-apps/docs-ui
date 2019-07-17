import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

import { EmptyState } from 'vtex.styleguide'

const EmptyDocs: FunctionComponent = () => (
  <div className="pa7 w-100 flex justify-center">
    <EmptyState title="Something went wrong">
      <p>
        <FormattedMessage id="docs/empty-docs" />
      </p>
    </EmptyState>
  </div>
)

export default EmptyDocs
