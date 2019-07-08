import React, { FunctionComponent } from 'react'

const CustomCard: FunctionComponent = ({ children }) => (
  <div
    style={{ boxShadow: '0 3px 9px 0 rgba(61, 62, 64, 0.2)' }}
    className='vtex-card card w-100 b2 br2 bg-base--inverted c-on-base pa6'>
    {children}
  </div>
)

export default CustomCard
