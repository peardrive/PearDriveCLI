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

import * as C from "../@constants/index.js";
import * as utils from "./index.js";
import * as log from "../@log/index.js";

/** Create Corestore folder for given PearDrive instance */
export function createCorestoreFolder() {
  try {
    const folderPath = utils.createNewFolderPath(C.CORESTORE_DIR);
    log.info("Creating Corestore folder at", folderPath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      log.debug("Corestore folder created at", folderPath);
    } else {
      log.warn("Corestore folder already exists at", folderPath);
    }

    return folderPath;
  } catch (error) {
    log.error("Error creating Corestore folder", error);
    console.error("Error creating Corestore folder", error);
    throw new Error(error);
  }
}
