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
import * as log from "../../@log/index.js";
import io from "../../@io/index.js";
import { mainMenu } from "../index.js";

/** DELETE_NETWORK.SELECT request handler*/
export function req() {
  log.info("Requesting DELETE_NETWORK.SELECT");
  io.clear();
  // Get peardrive data
  const pearDriveData = globalState.pearDrives.map((drive) => {
    const saveData = drive.saveData;
    const pdData = {
      key: saveData.networkKey,
      nickname: saveData.networkNickname.name,
    };
    return pdData;
  });
  io.prompt();
}

/** DELETE_NETWORK.SELECT response handler */
export function res(res) {
  const networkKey = res;
  log.info("Deleting PearDrive network data for network:", networkKey);
  mainMenu.req();
}
