import { getDirName, createDir, rootDir }from './helper.js';
import pino from 'pino'

const pathLogsDir = `${rootDir}/logs`
await createDir(pathLogsDir)

const transport = pino.transport({
  target: 'pino/file',
  options: {
    destination: pathLogsDir + '/app.log'
  },
})

export default pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'info',
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport
)
