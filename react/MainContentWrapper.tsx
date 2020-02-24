import React, { FC } from 'react'
import { useDevice } from 'vtex.device-detector'

import { EnhancedAppVersionProvider } from './components/AppVersionContext'

const MainContentWrapper: FC = ({ children }) => {
  const { isMobile } = useDevice()

  return (
    <main className="flex">
      <EnhancedAppVersionProvider>{children}</EnhancedAppVersionProvider>
    </main>
  )
}

export default MainContentWrapper
