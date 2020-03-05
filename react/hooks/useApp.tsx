import { useRuntime } from 'vtex.render-runtime'

import { useAppVersionState } from '../components/AppVersionContext'

export function useApp() {
  const {
    route: { params },
  } = useRuntime()

  const { file } = params
  const { appName, major } = useAppVersionState()
  const fileName = file ? slugToPascal(file) : 'README'

  const finalAppName = `${appName}@${major}`

  return { appName: finalAppName, fileName }
}

function slugToPascal(slug: string) {
  const result = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  return result
}
