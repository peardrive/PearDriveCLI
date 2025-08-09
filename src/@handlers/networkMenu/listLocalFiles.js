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

/** NETWORK_MENU.LOCAL request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export async function req(clear = true) {
  log.info("Handling NETWORK_MENU.LOCAL");
  clear && utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.LOCAL;

  const pearDrive = globalState.getSelectedPearDrive();
  if (!pearDrive) {
    console.log("No PearDrive selected");
    handlers.mainMenu.req(false);
    return;
  }

  const localFiles = await pearDrive.listLocalFiles();
  globalState.localFiles = localFiles || [];
  console.log("Local PearDrive files:");
  localFiles.length === 0
    ? console.log("No local PearDrive files found.")
    : localFiles.forEach((file, index) => {
        console.log(`${index}. ${file}`);
      });

  console.log("=== Enter any key to return to the main menu ===");
}

/** NETWORK_MENU.LOCAL response handler
 *
 * @param {string} response
 */
export function res(response) {
  log.info("Handling NETWORK_MENU.LOCAL with:", response);

  if (response.toLowerCase() === "back") {
    console.log("Returning to network menu...");
    log.info("Returning to LIST_NETWORK.SELECTED in NETWORK_MENU.LOCAL");
    handlers.listNetwork.selected.req(false);
    return;
  }
  handlers.mainMenu.req();
}
