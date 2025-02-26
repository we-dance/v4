import * as winston from "winston";
import * as path from "path";
import * as fs from "fs";

const logDir = path.join(__dirname, "..", "..", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const importDate = new Date().toISOString();

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, `import.${importDate}.log`),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      level: "error",
      options: { flags: "w" },
    }),
    new winston.transports.File({
      filename: path.join(logDir, `import.log`),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
      ),
      level: "error",
      options: { flags: "w" },
    }),
  ],
});

export { logger };

export function getLogger(label: string) {
  return logger.child({ label });
}
