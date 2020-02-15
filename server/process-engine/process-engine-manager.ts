import { Domain, pubsub } from '@things-factory/shell'

const { combine, timestamp, splat, printf } = format

import { Engine } from 'bpmn-engine'
import { ServiceManager } from './service-manager'
import { ListenerManager } from './listener-manager'
import { LogManager } from './log-manager'

export class ProcessEngineManager {
  private static instances = {}
  private static logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`
  })

  public static bootup() {}

  public static launchProcess(process, variables) {
    const { name, model: source } = process

    const engine = Engine({
      name,
      source,
      variables
    })

    engine.execute({
      listener: ListenerManager.listener,
      services: ServiceManager.services,
      variables
    })

    ProcessEngineManager.instances[name] = engine
  }

  public static retireProcess(process) {
    process.retire()
  }
}