import "dotenv/config";
import { readFiles } from "../utils/filesystem";

export function getDanceStyles() {
  const backupPath = String(process.env.DANCE_STYLES_PATH);
  return readFiles(backupPath);
}
