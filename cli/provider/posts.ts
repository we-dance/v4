import 'dotenv/config'
import { readFiles } from '../utils/filesystem'

export function getPosts() {
  return [...getNormalPosts(), ...getStories()]
}

export function getStories() {
  const backupPath = String(process.env.BACKUP_PATH)
  return readFiles(backupPath + '/stories')
}

export function getNormalPosts() {
  const backupPath = String(process.env.BACKUP_PATH)
  return readFiles(backupPath + '/posts').filter(
    (p: any) =>
      !['event', 'import_event', 'series', 'import_error'].includes(p.type)
  )
}
