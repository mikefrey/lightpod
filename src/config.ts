import * as fs from 'fs'
import * as Path from 'path'

export function loadConfig(path: string): Config {
  const buf = fs.readFileSync(Path.join(__dirname, path))
  const cfg = JSON.parse(buf.toString())
  return cfg
}
