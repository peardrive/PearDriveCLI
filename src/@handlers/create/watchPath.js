/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import fs from "fs";
import path from "path";

import * as utils from "../../@utils/index.js";
import * as C from "../../@constants/index.js";
import * as log from "../../@log/index.js";
import io from "../../@io/index.js";
import G from "../../@globalState/index.js";
import { mainMenu } from "../index.js";

/** CREATE.WATCH_PATH request handler */
export function req() {
  log.info("Requesting CREATE.WATCH_PATH");
  G.currentState = C.CLI_STATE.CREATE.WATCH_PATH;

  io.mainDivider();
  io.doubleSlashBorder(
    "Enter local drive path (blank for random in default folder):"
  );
  io.mainDivider();

  io.prompt();
}

/** CREATE.WATCH_PATH response handler */
export function res(response) {
  log.info("Handling CREATE.WATCH_PATH with:", response);
  if (response.length) G.createNewPearDriveArgs.watchPath = response;
  else {
    fs.mkdirSync(path.join(G.watchDir, "default"), { recursive: true });
    G.createNewPearDriveArgs.watchPath = path.resolve(G.watchDir, "default");
  }

  utils.pearDrive.create().then(() => {
    mainMenu.req();
  });
}
