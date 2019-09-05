import React, { FC } from 'react'
import { EnhancedAppVersionProvider } from './components/AppVersionContext'

const MainContentWrapper: FC = ({ children }) => (
  <main className="w-90-l center" style={{ maxWidth: '900px' }}>
    <EnhancedAppVersionProvider>
      <div className="flex">{children}</div>
    </EnhancedAppVersionProvider>
  </main>
)

export default MainContentWrapper
