/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import fs from "fs";

import G from "../../@globalState/index.js";
import * as log from "../../@log/index.js";

/** Retrieve parsed JSON data from save file */
export function getAll() {
  log.info("Getting save data");
  try {
    if (fs.existsSync(G.saveFilePath)) {
      return JSON.parse(fs.readFileSync(G.saveFilePath));
    }
  } catch (error) {
    log.error("Error getting save data", error);
    console.error("Error getting save data", error);
    throw new Error(error);
  }
}
