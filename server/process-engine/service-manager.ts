var services = {
  isBelow: (input, test) => {
    return input < test
  }
}

export class ServiceManager {
  public static get services() {
    return services
  }
}
