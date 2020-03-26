import React, { FC } from 'react'

export const titleCell: FC<{ title: string }> = ({ title }) => (
  <span
    className={'pv1 ph2 mw6 br2 bg-muted-5 ba b--muted-3 t-code c-emphasis'}>
    {title}
  </span>
)

export const codeCell: FC<{ code: string }> = ({ code }) => (
  <span
    className={'pv1 ph2 mw6 br2 bg-muted-5 ba b--muted-3 t-code c-emphasis'}>
    {code}
  </span>
)

export const descriptionCell: FC<{ description: string }> = ({
  description,
}) => <span className={'pv1 ph2 br2 pv7'}>{description}</span>
