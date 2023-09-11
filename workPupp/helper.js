import { fileURLToPath } from 'url';
import * as fs from 'fs';
import path from 'path';

export function getDirName(moduleUrl) {
  const __filename = fileURLToPath(moduleUrl)
  return path.dirname(__filename)
}

export async function createDir(pathDir) {
  await fs.promises.access(pathDir).catch(async () =>
    await fs.promises.mkdir(pathDir, err => {
      if (err) {
        new SyntaxError(`failed to create folder: ${pathDir}`)
      };
    })
  )
}
