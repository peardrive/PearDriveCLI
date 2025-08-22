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
const { print } = utils;

/** LIST_NETWORK.all request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting LIST_NETWORK.ALL");
  if (clear) print.clear();
  else print.newLine();
  globalState.currentState = C.CLI_STATE.LIST_NETWORK.ALL;

  // Header
  print.doubleSlashEqualsDivider();
  print.doubleSlashBorder("Active PearDrive Networks");
  print.divider();

  // PearDrives List
  const hasPearDrives = globalState.pearDrives.length > 0;
  if (!hasPearDrives) {
    print.slashBorder();
    print.slashBorder("No saved PearDrive networks");
    print.slashBorder();
  } else {
    globalState.pearDrives.map((pearDrive, index) => {
      if (index !== 0) print.divider();
      print.slashBorder();
      print.slashBorder(`🍐 PearDrive [${index}]`);
      print.slashBorder();
      print.pearDriveSaveData(pearDrive.saveData, pearDrive.connected);
      print.slashBorder();
    });
  }

  // Footer
  print.divider();
  print.doubleSlashBorder("Enter the PearDrive number [n] to select it.");
  print.doubleSlashBorder("Enter 'b' or 'back' to return to the main menu.");
  print.doubleSlashEqualsDivider();
  io.prompt();
}

/** LIST_NETWORK.ALL response handler  */
export function res(response) {
  log.info("Handling LIST_NETWORK.ALL with:", response);
  print.ln();

  if (response.toLowerCase() === "back" || response.toLowerCase() === "b") {
    print.ln("Returning to main menu...");
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
    print.ln("Invalid input. Please enter a number.");
    print.ln();
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
