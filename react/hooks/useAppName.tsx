import { useRuntime } from 'vtex.render-runtime'
import { useAppVersionState } from '../components/AppVersionContext'

export function useAppNameAndFile() {
  const {
    route: { params },
  } = useRuntime()

  const { app, file } = params
  const appName = app ? app.split('@')[0] : null
  const fileName = file || 'README.md'

  /* eslint-disable react-hooks/rules-of-hooks */
  const major = appName ? useAppVersionState().major : null

  const finalAppName = major ? `${appName}@${major}.x` : undefined

  return { appName: finalAppName, fileName }
}
