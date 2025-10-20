/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import * as C from "../@constants/index.js";
import * as handlers from "../@handlers/index.js";
import globalState from "../@globalState/index.js";

/**
 * Handle CLI state commands for a given input
 *
 * @param {string} input - Input to handle
 *
 * @returns {boolean} - True if input is a CLI state command, false otherwise
 */
export function cliStateCommands(input) {
  switch (globalState.currentState) {
    case C.CLI_STATE.INITIALIZING:
      return false;

    case C.CLI_STATE.MAIN:
      handlers.mainMenu.res(input);
      return true;

    case C.CLI_STATE.CREATE.RELAY_MODE:
      handlers.create.relayMode.res(input);
      return true;

    case C.CLI_STATE.CREATE.WATCH_PATH:
      handlers.create.watchPath.res(input);
      return true;

    case C.CLI_STATE.JOIN_EXISTING.NETWORK_KEY:
      handlers.joinExisting.networkKey.res(input);
      return true;

    case C.CLI_STATE.LIST_NETWORK.ALL:
      handlers.listNetwork.all.res(input);
      return true;

    case C.CLI_STATE.LIST_NETWORK.SELECTED:
      handlers.listNetwork.selected.res(input);
      return true;

    case C.CLI_STATE.NETWORK_MENU.QR:
      handlers.networkMenu.qr.res(input);
      return true;

    case C.CLI_STATE.NETWORK_MENU.SET_NETWORK_NICKNAME:
      handlers.networkMenu.setNetworkNickname.res(input);
      return true;

    case C.CLI_STATE.NETWORK_MENU.TOGGLE_RELAY_MODE:
      handlers.networkMenu.toggleRelayMode.res(input);
      return true;

    case C.CLI_STATE.NETWORK_MENU.DELETE_DRIVE:
      handlers.networkMenu.deleteDrive.res(input);
      return true;

    case C.CLI_STATE.NETWORK_MENU.LOCAL:
      handlers.networkMenu.listLocalFiles.res(input);
      return true;

    case C.CLI_STATE.NETWORK_MENU.NETWORK:
      handlers.networkMenu.listNetworkFiles.res(input);
      return true;

    default:
      return false;
  }
}
