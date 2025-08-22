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
  if (clear) print.clear();
  else print.newLine();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.LOCAL;

  // Get the selected PearDrive
  const pearDrive = globalState.getSelectedPearDrive();
  if (!pearDrive) {
    console.log("No PearDrive selected");
    handlers.mainMenu.req(false);
    return;
  }

  // Get local file data
  const localFiles = await pearDrive.listLocalFiles();
  const files = localFiles.files || [];

  // Header
  print.doubleSlashEqualsDivider();
  print.doubleSlashBorder(
    `🍐 Local Files for PearDrive [${globalState.selectedPearDrive}]`
  );
  print.divider();

  // Print local files
  print.slashBorder();
  globalState.localFiles = files || [];
  files.length === 0
    ? print.slashBorder("No local PearDrive files found.")
    : files.forEach((file, index) => {
        print.slashBorder(`  [${index}]: ${fileLog(file)}`);
      });

  // Footer
  print.divider();
  print.doubleSlashBorder("Enter 'b' or 'back' to return to network menu");
  print.doubleSlashEqualsDivider();
}

/** NETWORK_MENU.LOCAL response handler
 *
 * @param {string} response
 */
export function res(response) {
  log.info("Handling NETWORK_MENU.LOCAL with:", response);

  if (response.toLowerCase() === "back" || response.toLowerCase() === "b") {
    print.newLine();
    print.doubleSlashEqualsDivider();
    print.doubleSlashBorder("Returning to network menu...");
    print.doubleSlashEqualsDivider();
    log.info("Returning to LIST_NETWORK.SELECTED in NETWORK_MENU.LOCAL");
    handlers.listNetwork.selected.req(true);
    return;
  }
  handlers.mainMenu.req(true);
}
