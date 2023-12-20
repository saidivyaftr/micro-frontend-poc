import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'
// import winston from 'winston/lib/winston/config'

const initializeLogger = () => {
  // commenting the logger file code for future reference
  // const fileLogTransport = new transports.DailyRotateFile({
  //   filename: `logs/${_fileName}-%DATE%.log`,
  //   datePattern: 'YYYY-MM-DD',
  //   zippedArchive: true,
  //   maxSize: '20m',
  //   maxFiles: '60d',
  // })
  const consoleTransport = new transports.Console({
    handleExceptions: false,
    json: false,
    colorize: true,
    raw: true,
    format: format.combine(
      format.colorize(),
      format.printf((i) => `${i.message}`),
    ),
  })
  const logger = createLogger({
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),

      format.splat(),
      format.printf(
        ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
          `${timestamp} [${label}] ${level}: ${message}`,
      ),
    ),
    defaultMeta: { service: 'my-app' },
    transports: [consoleTransport],
  })
  // commenting the logger file code for future reference
  // if (process.env.NODE_ENV !== 'development') {
  //   logger.add(fileLogTransport)
  // }

  return logger
}

export default initializeLogger()
