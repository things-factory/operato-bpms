export * from './graphql'
export * from './migrations'

import { startEngine } from './process-engine'

process.on('bootstrap-module-start' as any, async ({ app, config, schema }: any) => {
  startEngine()
})
