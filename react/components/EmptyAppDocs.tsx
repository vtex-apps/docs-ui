import React, { FC } from 'react'
import { EmptyState } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

const EmptyDocs: FC = () => (
  <div className="pa10 w-100 flex justify-center">
    <EmptyState title="Sorry">
      <p>
        <FormattedMessage id="docs-ui/empty-docs" />
      </p>
    </EmptyState>
  </div>
)

export default EmptyDocs
