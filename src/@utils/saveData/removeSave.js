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

/** Remove save data from save file
 *
 * @param {Object | string} saveData - The save data to remove, or just the
 * network key as a string
 */
export function removeSave(saveData) {
  log.info("Removing save data");
  log.debug("Save data to remove:", saveData);

  try {
    const data = utils.saveData.getAll();
    const networkKey = saveData.networkKey;
    if (data) {
      const newData = data.filter((d) => d.networkKey !== networkKey);
      console.log("New save data", newData);
      fs.writeFileSync(C.SAVE_FILE, JSON.stringify(newData));
    }
  } catch (error) {
    console.error("Error removing save data", error);
    log.error("Error removing save data", error);
    throw new Error(error);
  }
}
