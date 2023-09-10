import pino from 'pino'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transport = pino.transport({
  target: 'pino/file',
  options: {
    destination: `${path.join(__dirname, '..')}/logs/app.log`
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
