import React, { FC } from 'react'
import { EmptyState } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

const EmptySummary: FC = () => (
  <div className="w-100 flex justify-center">
    <EmptyState title="Something went wrong">
      <p>
        <FormattedMessage id="docs-ui/empty-summary" />
      </p>
    </EmptyState>
  </div>
)

export default EmptySummary
