/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import PearDrive, { EVENT } from "@peardrive/core";

import * as utils from "../index.js";
import globalState from "../../@globalState/index.js";
import * as log from "../../@log/index.js";

/** Load existing PearDrive instance from args */
export async function load(saveData) {
  log.info("Loading PearDrive instance from save data", saveData.networkKey);

  try {
    const drive = new PearDrive(saveData);
    await drive.ready();
    await drive.joinNetwork(saveData.networkKey);
    drive.on(EVENT.SAVE_DATA_UPDATE, (newSaveData) => {
      utils.saveData.save(newSaveData);
    });

    globalState.pearDrives.push(drive);
  } catch (error) {
    log.error("Error loading PearDrive instance", error);
    console.error("Error loading PearDrive instance", error);
  }
}
