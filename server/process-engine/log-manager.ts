import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
const { combine, timestamp, splat, printf } = format

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

export class LogManager {
  public static create({ name }) {
    return createLogger({
      format: combine(timestamp(), splat(), logFormat),
      transports: [
        new (transports as any).DailyRotateFile({
          filename: `logs/process-${name}-%DATE%.log`,
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: false,
          maxSize: '20m',
          maxFiles: '14d',
          level: 'info'
        })
      ]
    })
  }
}
