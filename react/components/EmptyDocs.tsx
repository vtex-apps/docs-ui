import React, { FC } from 'react'
import {
  FormattedMessage,
  injectIntl,
  defineMessages,
  WrappedComponentProps,
} from 'react-intl'

import { EmptyState } from 'vtex.styleguide'

defineMessages({
  emptyStateTitle: {
    id: 'docs/empty.title',
    defaultMessage: '',
  },
})

const EmptyDocs: FC<WrappedComponentProps> = ({ intl }) => (
  <div className="pa7 w-100 flex justify-center">
    <EmptyState title={intl.formatMessage({ id: 'docs/empty.title' })}>
      <p>
        <FormattedMessage id="docs/empty-docs" />
      </p>
    </EmptyState>
  </div>
)

export default injectIntl(EmptyDocs)
