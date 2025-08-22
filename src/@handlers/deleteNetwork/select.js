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
import globalState from "../../@globalState";
import * as log from "../../@log";
import { mainMenu } from "..";
const { print } = utils;

/** DELETE_NETWORK.SELECT request handler*/
export function req() {
  log.info("Requesting DELETE_NETWORK.SELECT");
  print.clear();
  // Get peardrive data
  const pearDriveData = globalState.pearDrives.map((drive) => {
    const saveData = drive.saveData;
    const pdData = {
      key: saveData.networkKey,
      nickname: saveData.networkNickname.name,
    };
    return pdData;
  });
}

/** DELETE_NETWORK.SELECT response handler */
export function res(res) {
  const networkKey = res;
  log.info("Deleting PearDrive network data for network:", networkKey);
  mainMenu.req();
}
