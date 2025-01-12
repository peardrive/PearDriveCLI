import fs from "bare-fs";

import * as C from "./constants.js";

/** Log to logfile
 *
 * @param {"INFO" | "WARN" | "ERROR"} level - Log level
 * @param {string} message - Message to be logged
 */
export function log(level = "INFO", message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

  fs.appendFileSync(C.LOG_FILE, logEntry, (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
}
