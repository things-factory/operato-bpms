import { EventEmitter } from 'events'
import listeners from './listeners'

export class ListenerManager {
  private static _listener

  public static get listener() {
    if (!ListenerManager._listener) {
      ListenerManager.buildListener()
    }

    return ListenerManager._listener
  }

  private static buildListener() {
    ListenerManager._listener = new EventEmitter()
    for (var event in listeners) {
      ListenerManager._listener.on(event, listeners[event])
    }
  }
}
