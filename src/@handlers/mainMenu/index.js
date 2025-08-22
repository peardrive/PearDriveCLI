/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import globalState from "../../@globalState";
import * as C from "../../@constants";
import * as utils from "../../@utils";
import * as log from "../../@log";
import * as handlers from "..";
const { print } = utils;

/**
 * MAIN_MENU request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * displaying the menu
 */
export function req(clear = true) {
  log.info("Requesting MAIN_MENU");
  if (clear) print.clear();
  else print.newLine();
  globalState.currentState = C.CLI_STATE.MAIN;
  print.doubleSlashEqualsDivider();
  print.doubleSlashBorder("🍐 Welcome to PearDrive CLI 🍐");
  print.divider();

  print.slashBorder();
  print.slashBorder("OPTIONS:");
  print.slashBorder();
  print.slashBorder("1. 'create' Create new PearDrive");
  print.slashBorder("2. 'join' Join existing PearDrive network");
  print.slashBorder(
    "3. 'list' List all PearDrive networks or select a network"
  );
  print.slashBorder("0. 'exit' Exit");
  print.slashBorder();
  print.divider();
  print.doubleSlashBorder(
    "Enter the number or quoted command to select an option"
  );
  print.doubleSlashBorder("Enter 'quit' at any time to end the process");
  print.doubleSlashEqualsDivider();
}

/** MAIN_MENU response handler */
export function res(response) {
  log.info("Handling MAIN_MENU with:", response);
  switch (response) {
    // Create new PearDrive
    case "1":
    case "create":
      handlers.create.relayMode.req();
      break;

    // Join existing PearDrive network
    case "2":
    case "join":
      handlers.joinExisting.networkKey.req();
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
