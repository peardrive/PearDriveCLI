/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/** Different states of the CLI, what is the next input for */
export const CLI_STATE = {
  INITIALIZING: "INITIALIZING",
  MAIN: "MAIN",
  CREATE: {
    ARCHIVE_MODE: "CREATE.ARCHIVE_MODE",
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
    TOGGLE_ARCHIVE_MODE: "NETWORK_MENU.TOGGLE_ARCHIVE_MODE",
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
