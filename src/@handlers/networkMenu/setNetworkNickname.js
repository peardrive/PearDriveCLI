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

/** NETWORK_MENU.SET_NETWORK_NICKNAME request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting NETWORK_MENU.SET_NETWORK_NICKNAME");
  clear && utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.SET_NETWORK_NICKNAME;

  const pearDrive = globalState.getSelectedPearDrive();
  if (!pearDrive) {
    console.log("No PearDrive selected");
    handlers.mainMenu.req(false);
    return;
  }
  const saveData = pearDrive.getSaveData();
  const nickname = saveData.nickname;

  console.log("Current nickname:", nickname);
  console.log("Enter new nickname (or press enter to keep the current one):");
}

/** NETWORK_MENU.SET_NETWORK_NICKNAME response handler
 *
 * @param {string} response
 */
export function res(response) {
  log.info("Handling NETWORK_MENU.SET_NETWORK_NICKNAME with:", response);

  // Validate input
  if (response.length > 20) {
    console.log("Nickname is too long. Please enter a shorter one.");
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
