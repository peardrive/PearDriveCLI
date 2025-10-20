/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import path from "path";

/** Root path directory */
export const CUR_PATH = path.resolve(".");

/** Base data directory */
export const DATA_DIR = path.join(CUR_PATH, "data");

/** Local filesystem directory */
export const WATCH_DIR = path.join(DATA_DIR, "local");

/** Corestore data directory */
export const CORESTORE_DIR = path.join(DATA_DIR, "store");

/** Save data directory */
export const SAVE_DIR = path.join(DATA_DIR, "save");

/** Save file path */
export const SAVE_FILE = path.join(SAVE_DIR, "save.json");

/** Logs path */
export const LOG_DIR = path.join(DATA_DIR, "logs");

/** Core logs path */
export const CORE_LOG_DIR = path.join(LOG_DIR, "core");

/** Log file path */
export const LOG_FILE = path.join(LOG_DIR, "log.log");

/** Different states of the CLI, what is the next input for */
export const CLI_STATE = {
  INITIALIZING: "INITIALIZING",
  MAIN: "MAIN",
  CREATE: {
    RELAY_MODE: "CREATE.RELAY_MODE",
    WATCH_PATH: "CREATE.WATCH_PATH",
  },
  JOIN_EXISTING: {
    NETWORK_KEY: "JOIN_EXISTING.NETWORK_KEY",
    SEED: "JOIN_EXISTING.SEED",
    WATCH_PATH: "JOIN_EXISTING.WATCH_PATH",
  },
  LIST_NETWORK: {
    ALL: "LIST_NETWORK.ALL",
    SELECTED: "LIST_NETWORK.SELECTED",
  },
  DELETE_NETWORK: {
    SELECT: "DELETE_NETWORK.SELECT",
  },
  NETWORK_MENU: {
    QR: "NETWORK_MENU.QR",
    SET_NETWORK_NICKNAME: "NETWORK_MENU.SET_NETWORK_NICKNAME",
    TOGGLE_RELAY_MODE: "NETWORK_MENU.TOGGLE_RELAY_MODE",
    DELETE_DRIVE: "NETWORK_MENU.DELETE_DRIVE",
    LOCAL: "NETWORK_MENU.LOCAL",
    NETWORK: "NETWORK_MENU.NETWORK",
  },
};

/** Universal commands */
export const UNIVERSAL_COMMANDS = {
  QUIT: "quit",
  EXIT: "exit",
  MENU: "menu",
  CLEAR: "clear",
};
