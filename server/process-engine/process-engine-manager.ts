import { Domain, pubsub } from '@things-factory/shell'

import { Engine } from 'bpmn-engine'
import { ServiceManager } from './service-manager'
import { ListenerManager } from './listener-manager'
import { LogManager } from './log-manager'

export class ProcessEngineManager {
  private static instances = {}

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

    ProcessEngineManager.instances[engine.name] = engine
  }

  public static retireProcess(instance) {
    instance.stop()
  }
}
