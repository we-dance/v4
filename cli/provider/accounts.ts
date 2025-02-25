import "dotenv/config";
import { readFiles } from "../utils/filesystem";

export function getAccounts() {
  const backupPath = String(process.env.BACKUP_PATH);
  return readFiles(backupPath + "/accounts");
}

export function getUsers() {
  const backupPath = String(process.env.BACKUP_PATH);
  return require(backupPath + "/users.json").users;
}

export function getSuspended() {
  const backupPath = String(process.env.BACKUP_PATH);
  return readFiles(backupPath + "/suspended");
}
