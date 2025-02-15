import 'dotenv/config'
import { readFiles } from '../utils/filesystem'

export function getEvents () {
  const backupPath = String(process.env.BACKUP_PATH)
  return readFiles(backupPath + '/posts').filter((p: any) => p.type === 'event')
}
