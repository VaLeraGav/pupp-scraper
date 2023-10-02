import { fileURLToPath } from 'url';
import * as fs from 'fs';
import path from 'path';
import logger from './logger.js'

export function getDirName(moduleUrl) {
  const __filename = fileURLToPath(moduleUrl)
  return path.dirname(__filename)
}

export const rootDir = getDirName(import.meta.url)

export async function createDir(pathDir) {
  await fs.promises.access(pathDir).catch(async () =>
    await fs.promises.mkdir(pathDir, { recursive: true }, err => {
      if (err) {
        new SyntaxError(`failed to create folder: ${pathDir}`)
      };
    })
  )
}

export function getObj(pathJson) {
  const strList = fs.readFileSync(pathJson, 'utf8')
  try {
    return JSON.parse(strList);
  } catch (error) {
    if (error) {
      logger.error({ path:pathJson }, 'getObj');
    }
  }
}
