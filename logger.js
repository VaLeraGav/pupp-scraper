import { getDirName, createDir }from './helper.js';
import pino from 'pino'
import path from 'path';

const __dirname = getDirName(import.meta.url)
const pathLogsDir = `${path.join(__dirname, '..')}/logs`
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
