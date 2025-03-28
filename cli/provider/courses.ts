import 'dotenv/config'
import { readFiles } from '../utils/filesystem'

export function getCourses() {
  const backupPath = String(process.env.BACKUP_PATH)
  return readFiles(backupPath + '/courses')
}
