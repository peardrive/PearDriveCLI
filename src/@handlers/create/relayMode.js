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
import * as log from "../../@log/index.js";
import io from "../../@io/index.js";
import globalState from "../../@globalState/index.js";
import { create } from "../index.js";

/** CREATE.RELAY_MODE request handler */
export function req(clear = true) {
  log.info("Requesting CREATE.RELAY_MODE");
  if (clear) io.clear();
  else io.newLine();
  globalState.currentState = C.CLI_STATE.CREATE.RELAY_MODE;

  io.mainDivider();
  io.doubleSlashBorder("Enter relay mode(T/f):");
  io.mainDivider();

  io.prompt();
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
    indexOpts: {
      relay: relayMode,
    },
    networkKey,
  };

  create.watchPath.req();
}
