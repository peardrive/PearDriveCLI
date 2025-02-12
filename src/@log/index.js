import fs from "bare-fs";

import * as C from "../@constants";

/**
 * Log to logfile
 *
 * @param {"INFO" | "WARN" | "ERROR"} level - Log level
 * @param {*} message - Message to be logged
 */
function log(level, ...message) {
  const timestamp = new Date().toISOString();
  const messageString = message
    .map((arg) => {
      if (typeof arg === "object") {
        return JSON.stringify(arg);
      }

      return String(arg);
    })
    .join(" ");
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${messageString}\n`;

  fs.appendFileSync(C.LOG_FILE, logEntry, (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
}

/**
 * Log info message to logfile
 *
 * @param {string} message - Message to be logged
 */
export function info(...message) {
  log("INFO", ...message);
}

/**
 * Log debug message to logfile
 *
 * @param {string} message - Message to be logged
 */
export function debug(...message) {
  log("DEBUG", ...message);
}

/**
 * Log warning message to logfile
 *
 * @param {string} message - Message to be logged
 */
export function warn(...message) {
  log("WARN", ...message);
}

/**
 * Log error message to logfile
 *
 * @param {string} message - Message to be logged
 */
export function error(...message) {
  log("ERROR", ...message);
}

/**
 * Reset log file
 */
export function reset() {
  fs.writeFileSync(C.LOG_FILE, "");
}
