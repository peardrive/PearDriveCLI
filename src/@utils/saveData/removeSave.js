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

import * as C from "../../@constants/index.js";
import * as utils from "../index.js";
import * as log from "../../@log/index.js";

/** Remove save data from save file
 *
 * @param {Object | string} saveData - The save data to remove, or just the
 * network key as a string
 */
export function removeSave(saveData) {
  log.info("Removing save data");
  log.debug("Save data to remove:", saveData);

  try {
    // Validation
    if (!saveData.swarmOpts?.seed) {
      throw new Error("Seed is required to remove save data");
    }

    // Get existing save data
    const data = utils.saveData.getAll();
    if (!data) {
      log.warn("No save data found to remove");
      return;
    }

    // Filter out save data to remove
    const newData = data.filter(
      (d) => d.swarmOpts.seed !== saveData.swarmOpts.seed
    );
    fs.writeFileSync(C.SAVE_FILE, JSON.stringify(newData));
  } catch (error) {
    console.error("Error removing save data", error);
    log.error("Error removing save data", error);
    throw new Error(error);
  }
}
