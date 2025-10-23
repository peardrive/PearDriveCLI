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
import G from "../../@globalState/index.js";
import * as utils from "../../@utils/index.js";
import * as log from "../../@log/index.js";
import io from "../../@io/index.js";
import * as handlers from "../index.js";

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
  if (clear) io.clear();
  else io.newLine();
  G.currentState = C.CLI_STATE.NETWORK_MENU.LOCAL;

  // Get the selected PearDrive
  const pearDrive = G.getSelectedPearDrive();
  if (!pearDrive) {
    console.log("No PearDrive selected");
    handlers.mainMenu.req(false);
    return;
  }

  // Get local file data
  const localFiles = await pearDrive.listLocalFiles();
  const files = localFiles || [];

  // Header
  io.mainDivider();
  io.doubleSlashBorder(`🍐 Local Files for PearDrive [${G.selectedPearDrive}]`);
  io.divider();

  // Print local files
  io.slashBorder();
  G.localFiles = files || [];
  files.length === 0
    ? io.slashBorder("No local PearDrive files found.")
    : files.forEach((file, index) => {
        io.slashBorder(`  [${index}]: ${fileLog(file)}`);
      });
  io.slashBorder();

  // Footer
  io.divider();
  io.doubleSlashBorder("Enter 'b' or 'back' to return to network menu");
  io.mainDivider();
  io.prompt();
}

/** NETWORK_MENU.LOCAL response handler
 *
 * @param {string} response
 */
export function res(response) {
  log.info("Handling NETWORK_MENU.LOCAL with:", response);

  if (response.toLowerCase() === "back" || response.toLowerCase() === "b") {
    io.newLine();
    io.mainDivider();
    io.doubleSlashBorder("Returning to network menu...");
    io.mainDivider();
    log.info("Returning to LIST_NETWORK.SELECTED in NETWORK_MENU.LOCAL");
    handlers.listNetwork.selected.req(true);
    return;
  }
  handlers.mainMenu.req(true);
}
