/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import * as C from "../../@constants/index.js";
import globalState from "../../@globalState/index.js";
import * as utils from "../../@utils/index.js";
import * as log from "../../@log/index.js";
import io from "../../@io/index.js";
import * as handlers from "../index.js";

/** NETWORK_MENU.DELETE_DRIVE request handler
 *
 * @param {boolean} clear
 */
export async function req(clear = true) {
  log.info("Requesting NETWORK_MENU.DELETE_DRIVE");
  if (clear) io.clear();
  else io.newLine();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.DELETE_DRIVE;

  const pearDrive = globalState.pearDrives[globalState.selectedPearDrive];
  const networkKey = pearDrive.saveData.networkKey;

  try {
    await utils.pearDrive.destroy(networkKey);
    io.mainDivider();
    io.doubleSlashBorder(
      `PearDrive with network key ${networkKey} has been deleted successfully.`
    );
    io.doubleSlashBorder("Enter any key to return to the network list");
    io.mainDivider();
  } catch (error) {
    io.mainDivider();
    io.doubleSlashBorder(
      `Failed to delete PearDrive with network key ${networkKey}.`
    );
    io.doubleSlashBorder("Error: " + error.message);
    io.doubleSlashBorder("Enter any key to return to the network list");
    io.mainDivider();
    io.prompt();
  }
}

export function res() {
  log.info("Handling NETWORK_MENU.DELETE_DRIVE");
  handlers.listNetwork.all.req();
}
