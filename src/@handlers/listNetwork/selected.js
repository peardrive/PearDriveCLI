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
import * as all from "./all.js";
import io from "../../@io/index.js";
import * as handlers from "../index.js";

/**
 * LIST_NETWORK.selected request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting LIST_NETWORK.SELECTED");
  if (clear) io.clear();
  else io.newLine();
  G.currentState = C.CLI_STATE.LIST_NETWORK.SELECTED;

  // Ensure there is a selected PearDrive
  if (G.selectedPearDrive === null) {
    io.mainDivider();
    io.slashBorder("No PearDrive network selected");
    log.error("No PearDrive network selected");
    io.mainDivider();
    io.newLine();
    all.req();
    return;
  }

  // Ensure selected PearDrive exists
  if (!G.pearDrives.length) {
    io.mainDivider();
    io.slashBorder("No PearDrive networks found");
    io.mainDivider();
    log.error("No PearDrive networks found");
    all.req();
    return;
  }

  try {
    // Get selected PearDrive and data
    const selectedPearDrive = G.getSelectedPearDrive();
    const saveData = selectedPearDrive.saveData;
    const publicKey = selectedPearDrive.publicKey;

    // Header
    io.mainDivider();
    io.doubleSlashBorder(`🍐 Selected PearDrive [${G.selectedPearDrive}]`);
    io.divider();

    // PearDrive details
    io.slashBorder();
    io.pearDriveSaveData(saveData, selectedPearDrive.connected, publicKey);
    utils.pearDrive.logSaveData(
      saveData,
      selectedPearDrive.connected,
      publicKey
    );
    io.slashBorder();
    io.divider();

    // Options / controls
    io.doubleSlashBorder("OPTIONS");
    io.divider();
    io.slashBorder();
    io.slashBorder("1. 'qr' View network QR code");
    io.slashBorder(
      `2. 'archive' turn archive mode ${saveData.relayMode ? "off" : "on"}`
    );
    io.slashBorder("3. 'local' list all local PearDrive files");
    io.slashBorder("4. 'network' list all nonlocal PearDrive files");
    io.slashBorder("5. 'delete' Delete network");
    io.slashBorder("6. 'back' Return to network list");
    io.slashBorder();
    io.mainDivider();
    io.prompt();
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
    case "qr":
      handlers.networkMenu.qr.req();
      break;

    case "2":
    case "archive":
      handlers.networkMenu.toggleArchiveMode.req();
      break;

    case "3":
    case "local":
      handlers.networkMenu.listLocalFiles.req();
      break;

    case "4":
    case "network":
      handlers.networkMenu.listNetworkFiles.req();
      break;

    case "5":
    case "delete":
      handlers.networkMenu.deleteDrive.req();
      break;

    case "6":
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
