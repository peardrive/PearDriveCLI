/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import * as handlers from "..";
const { print } = utils;

/** NETWORK_MENU.DELETE_DRIVE request handler
 *
 * @param {boolean} clear
 */
export async function req(clear = true) {
  log.info("Requesting NETWORK_MENU.DELETE_DRIVE");
  if (clear) print.clear();
  else print.newLine();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.DELETE_DRIVE;

  const pearDrive = globalState.pearDrives[globalState.selectedPearDrive];
  const networkKey = pearDrive.saveData.networkKey;

  try {
    await utils.pearDrive.destroy(networkKey);
    print.doubleSlashEqualsDivider();
    print.doubleSlashBorder(
      `PearDrive with network key ${networkKey} has been deleted successfully.`
    );
    print.doubleSlashBorder("Enter any key to return to the network list");
    print.doubleSlashEqualsDivider();
  } catch (error) {
    print.doubleSlashEqualsDivider();
    print.doubleSlashBorder(
      `Failed to delete PearDrive with network key ${networkKey}.`
    );
    print.doubleSlashBorder("Error: " + error.message);
    print.doubleSlashBorder("Enter any key to return to the network list");
    print.doubleSlashEqualsDivider();
  }
}

export function res() {
  log.info("Handling NETWORK_MENU.DELETE_DRIVE");
  handlers.listNetwork.all.req();
}
