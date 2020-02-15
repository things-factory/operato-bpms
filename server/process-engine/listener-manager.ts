import { EventEmitter } from 'events'

const listener = new EventEmitter()

export class ListenerManager {
  public static get listener() {
    return listener
  }

  public static on(target, handler) {
    listener.on(target, handler)
  }
}
