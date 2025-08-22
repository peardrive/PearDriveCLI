/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import * as handlers from "..";
import * as utils from "../../@utils";
import * as log from "../../@log";
import globalState from "../../@globalState";
import * as C from "../../@constants";
const { print } = utils;

/** NETWORK_MENU.TOGGLE_RELAY_MODE handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting NETWORK_MENU.TOGGLE_RELAY_MODE");
  if (clear) print.clear();
  else print.newLine();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.TOGGLE_RELAY_MODE;

  // Get the selected PearDrive
  const pearDrive = globalState.getSelectedPearDrive();

  // Ensure a PearDrive is selected
  if (!pearDrive) {
    print.doubleSlashEqualsDivider();
    print.doubleSlashBorder("No PearDrive selected");
    print.doubleSlashEqualsDivider();
    log.error("Tried to toggle relay mode without a selected PearDrive");
    handlers.mainMenu.req(false);
    return;
  }

  // Get relay mode status
  const saveData = pearDrive.saveData;
  const relayMode = saveData.relayMode;

  // Toggle relay mode
  relayMode ? pearDrive.deactivateRelay() : pearDrive.activateRelay();

  // Print notification
  print.doubleSlashEqualsDivider();
  print.doubleSlashBorder(
    relayMode
      ? "🔴 Relay mode disabled for network:"
      : "🟢 Relay mode enabled for network:"
  );
  print.doubleSlashBorder(saveData.networkKey);
  print.divider();
  print.doubleSlashBorder("Enter any key to return to the network menu");
  print.doubleSlashEqualsDivider();
}

export function res(response) {
  log.info("Handling NETWORK_MENU.TOGGLE_RELAY_MODE with:", response);
  handlers.listNetwork.all.req();
}
