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
import * as utils from "..";
import * as log from "../../@log";

/**
 * Given a saveData object, save it to the save file. Overwrite existing
 * save for this peer if it exists.
 */
export function save(saveData) {
  log.info("Saving save data");
  log.debug("Save data to save:", saveData);

  try {
    // Validation
    if (!saveData.swarmOpts?.seed) {
      throw new Error("Seed is required to save data");
    }

    // Save as new peer or overwrite existing, based on seed
    const saveDataList = utils.saveData.getAll();
    if (saveDataList) {
      // Check for existing save with same seed
      const existingIndex = saveDataList.findIndex(
        (item) => item.swarmOpts.seed === saveData.swarmOpts.seed
      );

      // Overwrite existing save, or add new save
      if (existingIndex !== -1) saveDataList[existingIndex] = saveData;
      else saveDataList.push(saveData);
      fs.writeFileSync(C.SAVE_FILE, JSON.stringify(saveDataList));
    }

    // Create new save file if it doesn't exist
    else fs.writeFileSync(C.SAVE_FILE, JSON.stringify([saveData]));
  } catch (error) {
    log.error("Error saving save data", error);
  }
}
