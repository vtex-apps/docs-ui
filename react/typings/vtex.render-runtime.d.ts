/* Typings for `render-runtime` */
declare module 'vtex.render-runtime' {
  import { Component, ReactElement } from 'react'

  export interface RenderContextProps {
    runtime: {
      account: string
    }
  }

  export const Link: any
  export const NoSSR: any
  export const RenderContextConsumer: ReactElement
  export const canUseDOM: boolean
  export const withRuntimeContext: ReactElement
  export const Helmet: any
  export const useRuntime: () => {
    culture: {
      locale: string
    }
    emitter: {
      emit: (eventName: string, eventId: string) => void
    }
    query: {
      app: string
      filePath?: string
    }
  }
}
