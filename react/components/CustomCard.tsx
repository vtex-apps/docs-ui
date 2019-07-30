import React, { FC } from 'react'

const CustomCard: FC = ({ children }) => (
  <div
    style={{ boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.2)' }}
    className="w-100 b2 br2 bg-base--inverted c-on-base pa5">
    {children}
  </div>
)

export default CustomCard
