/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import * as utils from "../../@utils";
import * as C from "../../@constants";
import * as log from "../../@log";
import globalState from "../../@globalState";
import { create } from "..";
const { print } = utils;

/** CREATE.RELAY_MODE request handler */
export function req() {
  log.info("Requesting CREATE.RELAY_MODE");
  globalState.currentState = C.CLI_STATE.CREATE.RELAY_MODE;
  print.ln("Enter relay mode(T/f):");
}

/** CREATE.RELAY_MODE response handler */
export function res(response) {
  log.info("Handling CREATE.RELAY_MODE with:", response);
  // Check for existing networkKey
  let networkKey = undefined;
  if (Object.keys(globalState.createNewPearDriveArgs).includes("networkKey")) {
    networkKey = globalState.createNewPearDriveArgs["networkKey"];
  }

  let relayMode = true;
  if (response === "f" || response === "false") relayMode = false;

  globalState.createNewPearDriveArgs = {
    corestorePath: C.CORESTORE_DIR,
    localDrivePath: C.WATCH_DIR,
    relayMode,
    networkKey,
  };

  create.watchPath.req();
}
