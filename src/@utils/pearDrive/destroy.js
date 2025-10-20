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

import globalState from "../../@globalState/index.js";
import * as utils from "../index.js";
import * as log from "../../@log/index.js";

/** Delete a specific PearDrive network save data
 *
 * @param {string} networkKey - The network key of the PearDrive to delete
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} - If an error occurs while deleting the PearDrive network
 */
export async function destroy(networkKey) {
  log.info("Deleting saved PearDrive network data", networkKey);

  try {
    // Get pearDrive and index from global state
    const pearDriveIndex = globalState.getPearDrive(networkKey);
    const pearDrive = globalState.pearDrives[pearDriveIndex];
    const saveData = { ...pearDrive.saveData };
    log.debug("PearDrive to delete", pearDrive);

    // Close the PearDrive connection
    await pearDrive.close();

    // Remove from save data
    utils.saveData.removeSave(pearDrive.saveData);

    // Remove from global state
    const index = globalState.getPearDriveIndexFromSeed(pearDrive.seed);
    if (index === -1) {
      log.error("PearDrive not found in global state", pearDrive.seed);
      throw new Error(
        `PearDrive with seed ${pearDrive.seed} not found in global state`
      );
    }
    globalState.removePearDrive(index);

    // Remove corestore folder
    fs.rmSync(saveData.corestorePath, { recursive: true, force: true });
    log.info("Removed corestore folder for PearDrive", pearDrive.corestorePath);

    // Remove log file
    if (saveData.logOpts?.logToFile && saveData.logOpts?.logFilePath) {
      fs.unlinkSync(saveData.logOpts.logFilePath);
      log.info("Removed log file for PearDrive", saveData.logOpts.logFilePath);
    }
  } catch (error) {
    log.error("Error deleting PearDrive network", networkKey, error);
    throw new Error(error);
  }
}
