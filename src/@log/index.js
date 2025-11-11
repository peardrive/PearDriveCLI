/*!
 * Copyright (C) 2025 PearDrive LLC
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import fs from "fs";

import G from "../@globalState/index.js";
import * as C from "../@constants/index.js";
import * as utils from "../@utils/index.js";

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
        return utils.safeStringify(arg);
      }

      return String(arg);
    })
    .join(" ");
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${messageString}\n`;

  fs.appendFileSync(G.logFilePath, logEntry, (err) => {
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
