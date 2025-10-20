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
import * as handlers from "../index.js";

/** NETWORK_MENU.MENU request handler
 *
 */
export function req() {
  if (!globalState.selectedPearDrive) {
    console.log("No PearDrive selected");
    handlers.listNetwork.all.req(false);
    return;
  }

  const curPearDrive = globalState.pearDrives[globalState.selectedPearDrive];

  //TODO
}

export function res() {
  //TODO
}
