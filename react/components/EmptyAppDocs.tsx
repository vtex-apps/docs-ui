import React, { FunctionComponent } from 'react'
import { EmptyState } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

const EmptyDocs: FunctionComponent = () => (
  <div className="pa10 w-100 flex justify-center">
    <EmptyState title="Sorry">
      <p>
        <FormattedMessage id="docs/empty-docs" />
      </p>
    </EmptyState>
  </div>
)

export default EmptyDocs
