import React, { FC } from 'react'
import { useDevice } from 'vtex.device-detector'

import { EnhancedAppVersionProvider } from './components/AppVersionContext'

const MainContentWrapper: FC = ({ children }) => {
  const { isMobile } = useDevice()

  return (
    <main
      className="w-90-l center"
      style={{ maxWidth: `${isMobile ? '95vw' : '900px'}` }}>
      <EnhancedAppVersionProvider>
        <div className="flex">{children}</div>
      </EnhancedAppVersionProvider>
    </main>
  )
}

export default MainContentWrapper
