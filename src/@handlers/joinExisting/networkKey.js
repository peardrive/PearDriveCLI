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
import * as log from "../../@log";
import io from "../../@io";
import { create } from "..";

/** JOIN_EXISTING.NETWORK_KEY request handler */
export function req(clear = true) {
  log.info("Requesting JOIN_EXISTING.NETWORK_KEY");
  if (clear) io.clear();
  else io.newLine();
  globalState.currentState = C.CLI_STATE.JOIN_EXISTING.NETWORK_KEY;

  io.mainDivider();
  io.doubleSlashBorder("Enter network key:");
  io.mainDivider();

  io.prompt();
}

/** JOIN_EXISTING.NETWORK_KEY response handler */
export function res(response) {
  log.info("Handling JOIN_EXISTING.NETWORK_KEY with:", response);
  globalState.createNewPearDriveArgs.networkKey = response;
  create.relayMode.req();
}
