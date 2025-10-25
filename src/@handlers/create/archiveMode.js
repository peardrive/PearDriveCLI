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
import G from "../../@globalState/index.js";
import { create } from "../index.js";

/** CREATE.ARCHIVE_MODE request handler */
export function req(clear = true) {
  log.info("Requesting CREATE.ARCHIVE_MODE");
  if (clear) io.clear();
  else io.newLine();
  G.currentState = C.CLI_STATE.CREATE.ARCHIVE_MODE;

  io.mainDivider();
  io.doubleSlashBorder("Enter archive mode(T/f):");
  io.mainDivider();

  io.prompt();
}

/** CREATE.ARCHIVE_MODE response handler */
export function res(response) {
  log.info("Handling CREATE.ARCHIVE_MODE with:", response);
  // Check for existing networkKey
  let networkKey = undefined;
  if (Object.keys(G.createNewPearDriveArgs).includes("networkKey")) {
    networkKey = G.createNewPearDriveArgs["networkKey"];
  }

  let archiveMode = true;
  if (response === "f" || response === "false") archiveMode = false;
  G.createNewPearDriveArgs = {
    corestorePath: G.storeDir,
    localDrivePath: G.watchDir,
    indexOpts: {
      relay: archiveMode,
    },
    networkKey,
  };

  create.watchPath.req();
}
