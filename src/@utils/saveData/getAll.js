/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import fs from "bare-fs";

import * as C from "../../@constants";
import * as log from "../../@log";

/** Retrieve parsed JSON data from save file */
export function getAll() {
  log.info("Getting save data");
  try {
    if (fs.existsSync(C.SAVE_FILE)) {
      return JSON.parse(fs.readFileSync(C.SAVE_FILE));
    }
  } catch (error) {
    log.error("Error getting save data", error);
    console.error("Error getting save data", error);
    throw new Error(error);
  }
}
