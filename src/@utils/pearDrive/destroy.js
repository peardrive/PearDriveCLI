/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import globalState from "../../@globalState";
import * as utils from "..";
import * as log from "../../@log";

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
    log.debug("PearDrive to delete", pearDrive);

    // TODO resolve pear runtime error occurs on teardown
    //await pearDrive.close();

    // Remove from save data
    utils.saveData.removeSave(pearDrive.getSaveData());
  } catch (error) {
    log.error("Error deleting PearDrive network", networkKey, error);
    console.error("Error deleting PearDrive network", networkKey, error);
    throw new Error(error);
  }
}
