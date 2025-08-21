/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import PearDrive from "@hopets/pear-core";

import * as utils from "..";
import globalState from "../../@globalState";
import * as log from "../../@log";
import * as C from "../../@constants";

/** Create a new PearDrive instance */
export async function create() {
  log.info("Creating new PearDrive instance...");

  try {
    // Create PearDrive args
    const corestorePath = utils.createCorestoreFolder();
    const logFilePath = utils.createCoreLogFile();
    globalState.createNewPearDriveArgs = {
      ...globalState.createNewPearDriveArgs,
      corestorePath,
      logOpts: {
        logToFile: true,
        logFilePath,
      },
      logToFile: true,
    };

    // Initialize and configure drive
    log.debug(
      "Creating PearDrive instance with the following settings:",
      JSON.stringify(globalState.createNewPearDriveArgs)
    );
    const drive = new PearDrive(globalState.createNewPearDriveArgs);
    await drive.ready();
    await drive.joinNetwork();

    // Add to save data
    const saveData = drive.saveData;
    utils.saveData.addSave(saveData);
    log.info("PearDrive instance created and saved successfully");

    // Add to global state
    globalState.pearDrives.push(drive);
  } catch (error) {
    log.error("Error creating PearDrive instance", error);
    console.error("Error creating PearDrive instance", error);
    globalState.currentState = C.CLI_STATE.MAIN;
    throw new Error("Error creating PearDrive instance", error);
  }
}
