import React, { FC } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { EmptyState } from 'vtex.styleguide'

const EmptyDocs: FC = () => {
  const intl = useIntl()

  return (
    <div className="pa7 w-100 flex justify-center">
      <EmptyState title={intl.formatMessage({ id: 'docs-ui/empty.title' })}>
        <p>
          <FormattedMessage id="docs-ui/empty-docs" />
        </p>
      </EmptyState>
    </div>
  )
}

export default EmptyDocs
