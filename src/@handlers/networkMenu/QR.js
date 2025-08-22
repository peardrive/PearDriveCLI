/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import qrcode from "qrcode-terminal";

import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import io from "../../@io";
import * as handlers from "..";

/** NETWORK_MENU.QR request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting NETWORK_MENU.QR");
  if (clear) io.clear();
  else io.newLine();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.QR;

  // Get the selected PearDrive
  const pearDrive = globalState.getSelectedPearDrive();

  // Ensure a PearDrive is selected
  if (!pearDrive) {
    io.mainDivider();
    io.doubleSlashBorder("No PearDrive selected");
    io.mainDivider();
    handlers.mainMenu.req(false);
    return;
  }

  // Header
  io.mainDivider();
  io.doubleSlashBorder(
    `🍐 QR Code for PearDrive [${globalState.selectedPearDrive}]`
  );
  io.divider();

  // Generate QR code for the network key
  const networkKey = pearDrive.saveData.networkKey;
  qrcode.generate(networkKey, { small: true }, (qr) => {
    io.slashBorder();
    qr.split("\n").map((line) => {
      io.slashBorder("   " + line);
    });

    // Footer
    io.divider();
    io.doubleSlashBorder("Scan this QR code to join the network");
    io.doubleSlashBorder("Enter any key to return to the network menu");
    io.mainDivider();
    io.prompt();
  });
}

export function res(response) {
  log.info("Handling NETWORK_MENU.QR with:", response);
  handlers.listNetwork.selected.req(true);
}
