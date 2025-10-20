/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import globalState from "../../@globalState/index.js";
import * as C from "../../@constants/index.js";
import * as utils from "../../@utils/index.js";
import * as log from "../../@log/index.js";
import io from "../../@io/index.js";
import * as handlers from "../index.js";

/**
 * MAIN_MENU request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * displaying the menu
 */
export function req(clear = true) {
  log.info("Requesting MAIN_MENU");
  if (clear) io.clear();
  else io.newLine();
  globalState.currentState = C.CLI_STATE.MAIN;
  io.mainDivider();
  io.doubleSlashBorder("🍐 Welcome to PearDrive CLI 🍐");
  io.divider();

  io.slashBorder();
  io.slashBorder("OPTIONS:");
  io.slashBorder();
  io.slashBorder("1. 'create' Create new PearDrive");
  io.slashBorder("2. 'join' Join existing PearDrive network");
  io.slashBorder("3. 'list' List all PearDrive networks or select a network");
  io.slashBorder("0. 'exit' Exit");
  io.slashBorder();
  io.divider();
  io.doubleSlashBorder(
    "Enter the number or quoted command to select an option"
  );
  io.doubleSlashBorder("Enter 'quit' at any time to end the process");
  io.mainDivider();
  io.prompt();
}

/** MAIN_MENU response handler */
export function res(response) {
  log.info("Handling MAIN_MENU with:", response);
  switch (response) {
    // Create new PearDrive
    case "1":
    case "create":
      handlers.create.relayMode.req(true);
      break;

    // Join existing PearDrive network
    case "2":
    case "join":
      handlers.joinExisting.networkKey.req(true);
      break;

    // List all PearDrive networks
    case "3":
    case "list":
      handlers.listNetwork.all.req(true);
      break;

    // Stop program
    case "0":
    case "exit":
      utils.exit();
      break;

    default:
      console.log("Invalid input, please try again");
      break;
  }
}
