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
import * as log from "../../@log";
import io from "../../@io";
import * as handlers from "..";

/** NETWORK_MENU.SET_NETWORK_NICKNAME request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting NETWORK_MENU.SET_NETWORK_NICKNAME");
  if (clear) io.clear();
  else io.newLine();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.SET_NETWORK_NICKNAME;

  // Get selected PearDrive
  const pearDrive = globalState.getSelectedPearDrive();

  // Ensure a PearDrive is selected
  if (!pearDrive) {
    io.mainDivider();
    io.doubleSlashBorder("No PearDrive selected");
    io.mainDivider();
    log.error("Tried to set network nickname without a selected PearDrive");
    handlers.mainMenu.req(false);
    return;
  }

  // Get current nickname
  const saveData = pearDrive.saveData;
  const nickname = saveData.nickname;

  // Prompt
  io.mainDivider();
  io.doubleSlashBorder("Current nickname:", nickname);
  io.divider();
  io.slashBorder("Enter a new nickname for the network");
  io.slashBorder("Enter nothing to keep the current nickname");
  io.mainDivider();
  io.prompt();
}

/** NETWORK_MENU.SET_NETWORK_NICKNAME response handler
 *
 * @param {string} response
 */
export function res(response) {
  log.info("Handling NETWORK_MENU.SET_NETWORK_NICKNAME with:", response);

  // Validate input
  if (response.length > 20) {
    io.newLine();
    io.mainDivider();
    io.doubleSlashBorder(
      "Nickname cannot be longer than 20 characters, please try again."
    );
    io.mainDivider();
    log.error("Nickname is too long in NETWORK_MENU.SET_NETWORK_NICKNAME");
    req(false);
    return;
  }

  // Set nickname
  const pearDrive = globalState.getSelectedPearDrive();
  pearDrive.setNetworkNickname(response);
  console.log(`Network nickname set to: ${response}`);
  handlers.listNetwork.all.req(false);
}
