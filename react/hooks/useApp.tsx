import { useRuntime } from 'vtex.render-runtime'
import { useAppVersionState } from '../components/AppVersionContext'

export function useApp() {
  const {
    route: { params },
  } = useRuntime()

  const { file } = params
  const { appName, major } = useAppVersionState()
  const fileName = file || 'README'

  const finalAppName = `${appName}@${major}`

  return { appName: finalAppName, fileName }
}
