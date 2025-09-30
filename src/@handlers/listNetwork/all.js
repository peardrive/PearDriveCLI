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
import io from "../../@io";
import * as handlers from "..";

/** LIST_NETWORK.all request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting LIST_NETWORK.ALL");
  if (clear) io.clear();
  else io.newLine();
  globalState.currentState = C.CLI_STATE.LIST_NETWORK.ALL;

  // Header
  io.mainDivider();
  io.doubleSlashBorder("Active PearDrive Networks");
  io.divider();

  // PearDrives List
  const hasPearDrives = globalState.pearDrives.length > 0;
  if (!hasPearDrives) {
    io.slashBorder();
    io.slashBorder("No saved PearDrive networks");
    io.slashBorder();
  } else {
    globalState.pearDrives.map((pearDrive, index) => {
      if (index !== 0) io.divider();
      io.slashBorder();
      io.slashBorder(`🍐 PearDrive [${index}]`);
      io.slashBorder();
      io.pearDriveSaveData(
        pearDrive.saveData,
        pearDrive.connected,
        pearDrive.publicKey
      );
      utils.pearDrive.logSaveData(
        pearDrive.saveData,
        pearDrive.connected,
        pearDrive.publicKey
      );
      io.slashBorder();
    });
  }

  // Footer
  io.divider();
  io.doubleSlashBorder("Enter the PearDrive number [n] to select it.");
  io.doubleSlashBorder("Enter 'b' or 'back' to return to the main menu.");
  io.mainDivider();
  io.prompt();
}

/** LIST_NETWORK.ALL response handler  */
export function res(response) {
  log.info("Handling LIST_NETWORK.ALL with:", response);

  if (response.toLowerCase() === "back" || response.toLowerCase() === "b") {
    log.info("Returning to main menu from LIST_NETWORK.ALL");
    handlers.mainMenu.req();
    return;
  }

  // Validate input
  if (
    isNaN(response) ||
    response < 0 ||
    response >= globalState.pearDrives.length
  ) {
    io.mainDivider();
    io.doubleSlashBorder("Invalid input. Please enter a number.");
    io.mainDivider();
    io.newLine();
    log.error("Invalid input in LIST_NETWORK.ALL");
    req(false);
    return;
  }

  // Select PearDrive
  try {
    globalState.selectedPearDrive = parseInt(response);
    handlers.listNetwork.selected.req();
  } catch (error) {
    log.error("Error selecting PearDrive in LIST_NETWORK.ALL", error);
    req(false);
  }
}
