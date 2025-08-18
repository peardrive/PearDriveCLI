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

/** NETWORK_MENU.DELETE_DRIVE request handler
 *
 * @param {boolean} clear
 */
export async function req(clear = true) {
  log.info("Requesting NETWORK_MENU.DELETE_DRIVE");
  if (clear) utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.DELETE_DRIVE;

  const pearDrive = globalState.pearDrives[globalState.selectedPearDrive];
  const networkKey = pearDrive.getSaveData().networkKey;

  // TODO resolve pear runtime error occurs on teardown
  //await pearDrive.close();

  await utils.pearDrive.destroy(networkKey);

  console.log(
    `PearDrive with network key ${networkKey} has been deleted successfully.`
  );
  console.log("\n=== Enter any key to return to the main menu ===");
}

export function res() {
  log.info("Handling NETWORK_MENU.DELETE_DRIVE");
  handlers.mainMenu.req();
}
