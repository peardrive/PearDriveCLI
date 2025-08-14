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

/** Format the string for printing a file given the Core file object */
function fileLog(file) {
  const path = file.path;
  const size = utils.fileSizeStr(file.size);
  const timeAgo = utils.relativeTimeAgoStr(file.modified);
  return `${path} (${size}) - ${timeAgo}`;
}

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
  const files = localFiles.files || [];

  globalState.localFiles = files || [];
  console.log("Local PearDrive files:");
  files.length === 0
    ? console.log("No local PearDrive files found.")
    : files.forEach((file, index) => {
        console.log(`  [${index}]: ${fileLog(file)}`);
      });

  console.log("=== Enter 'b' or 'back' to return to network menu ===");
}

/** NETWORK_MENU.LOCAL response handler
 *
 * @param {string} response
 */
export function res(response) {
  log.info("Handling NETWORK_MENU.LOCAL with:", response);

  if (response.toLowerCase() === "back" || response.toLowerCase() === "b") {
    console.log("Returning to network menu...");
    log.info("Returning to LIST_NETWORK.SELECTED in NETWORK_MENU.LOCAL");
    handlers.listNetwork.selected.req(true);
    return;
  }
  handlers.mainMenu.req(true);
}
