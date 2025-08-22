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
import * as all from "./all";
import * as handlers from "..";
const { print } = utils;

/**
 * LIST_NETWORK.selected request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting LIST_NETWORK.SELECTED");
  if (clear) print.clear();
  else print.newLine();
  globalState.currentState = C.CLI_STATE.LIST_NETWORK.SELECTED;

  // Ensure there is a selected PearDrive
  if (globalState.selectedPearDrive === null) {
    print.doubleSlashEqualsDivider();
    print.slashBorder("No PearDrive network selected");
    log.error("No PearDrive network selected");
    print.doubleSlashEqualsDivider();
    print.newLine();
    all.req();
    return;
  }

  // Ensure selected PearDrive exists
  if (!globalState.pearDrives.length) {
    print.doubleSlashEqualsDivider();
    print.slashBorder("No PearDrive networks found");
    print.doubleSlashEqualsDivider();
    log.error("No PearDrive networks found");
    all.req();
    return;
  }

  try {
    // Get selected PearDrive and data
    const selectedPearDrive = globalState.getSelectedPearDrive();
    const saveData = selectedPearDrive.saveData;

    // Header
    print.doubleSlashEqualsDivider();
    print.doubleSlashBorder(
      `🍐 Selected PearDrive [${globalState.selectedPearDrive}]`
    );
    print.divider();

    // PearDrive details
    print.slashBorder();
    print.pearDriveSaveData(saveData, selectedPearDrive.connected, true);
    print.slashBorder();
    print.divider();

    // Options / controls
    print.doubleSlashBorder("OPTIONS");
    print.divider();
    print.slashBorder();
    print.slashBorder("1. 'nickname' Change/set network nickname");
    print.slashBorder("2. 'qr' View network QR code");
    print.slashBorder(
      `3. 'relay' turn relay mode ${saveData.relayMode ? "off" : "on"}`
    );
    print.slashBorder("4. 'local' list all local PearDrive files");
    print.slashBorder("5. 'network' list all nonlocal PearDrive files");
    print.slashBorder("6. 'delete' Delete network");
    print.slashBorder("7. 'back' Return to network list");
    print.slashBorder();
    print.doubleSlashEqualsDivider();
  } catch (error) {
    console.error("Error in LIST_NETWORK.selected", error);
    log.error("Error in LIST_NETWORK.selected", error);
    all.req(false);
  }
}

/** LIST_NETWORK.selected response handler */
export function res(response) {
  log.info("Handling LIST_NETWORK.selected with:", response);
  switch (response) {
    case "1":
    case "nickname":
      handlers.networkMenu.setNetworkNickname.req();
      break;

    case "2":
    case "qr":
      handlers.networkMenu.qr.req();
      break;

    case "3":
    case "relay":
      handlers.networkMenu.toggleRelayMode.req();
      break;

    case "4":
    case "local":
      handlers.networkMenu.listLocalFiles.req();
      break;

    case "4":
    case "network":
      handlers.networkMenu.listNetworkFiles.req();
      break;

    case "6":
    case "delete":
      handlers.networkMenu.deleteDrive.req();
      break;

    case "7":
    case "back":
      console.log("Returning to LIST_NETWORK.all...");
      log.info("Returning to LIST_NETWORK.all from LIST_NETWORK.selected");
      all.req();
      break;

    default:
      console.log("Invalid input, please try again");
      break;
  }
}
