import { useRuntime } from 'vtex.render-runtime'

export function useAppNameAndFile(major: string) {
  const {
    route: { params },
  } = useRuntime()

  const { app, file } = params
  const [appName] = app.split('@')
  const fileName = file || 'README.md'

  const finalAppName = `${appName}@${major}.x`

  return { appName: finalAppName, fileName }
}
