import pino from 'pino'

export default class Logger {
  constructor() {
    this.config = {}

    this.pino = pino({
      // timestamp: pino.stdTimeFunctions.isoTime,
      timestamp: false,
      messageKey: 'message',
      formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
      },
    })
  }

  resetConfig() {
    this.config = {}
  }

  getConfig() {
    return {
      log_time: new Date().toISOString(),
      ...this.config,
    }
  }

  setRequestId(request_id) {
    this.config.request_id = request_id
  }

  setUser({
    id,
    profile_type,
  }) {
    const user = {
      id,
      profile_type,
    }
    this.config.user = user
  }

  /*
  setEvent() -> TODO Implement this
  */

  log(method, ...args) {
    const config = this.getConfig()

    if (args[0] instanceof Error) {
      const error = args[0]

      const errorDetails = {
        ...config,
        err: {
          type: error.type,
          message: error.message,
          stack: error.stack,
        },
      }
      args[0] = errorDetails
    } else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
      args[0] = { ...config, ...args[0] }
    } else {
      args.unshift(config)
    }

    this.pino[method](...args)
  }

  trace(...args) {
    this.log('trace', ...args)
  }

  debug(...args) {
    this.log('debug', ...args)
  }

  info(...args) {
    this.log('info', ...args)
  }

  warn(...args) {
    this.log('warn', ...args)
  }

  error(...args) {
    this.log('error', ...args)
  }

  fatal(...args) {
    this.log('fatal', ...args)
  }
}
