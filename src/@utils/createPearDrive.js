import PearDrive from "peardrive-core-alpha";

import * as utils from ".";
import globalState from "../@globalState";
import * as handlers from "../@handlers";
import * as log from "../@log";
import * as C from "../@constants";

/** Create a new PearDrive instance */
export async function createPearDrive() {
  log.info("Creating new PearDrive instance...");

  try {
    // Create PearDrive args
    const corestorePath = utils.createCorestoreFolder();
    const logFilePath = utils.createCoreLogFile();
    globalState.createNewPearDriveArgs = {
      ...globalState.createNewPearDriveArgs,
      logToFile: true,
      corestorePath,
      logFilePath,
    };

    // Initialize and configure drive
    log.debug(
      "Creating PearDrive instance with the following settings:",
      globalState.createNewPearDriveArgs
    );
    const drive = new PearDrive(globalState.createNewPearDriveArgs);
    await drive.ready();
    await drive.joinNetwork(globalState.createNewPearDriveArgs.networkKey);

    const saveData = drive.getSaveData();
    utils.savePearDrive(saveData);

    globalState.pearDrives.push(drive);
  } catch (error) {
    log.error("Error creating PearDrive instance", error);
    console.error("Error creating PearDrive instance", error);
    globalState.currentState = C.CLI_STATE.MAIN;
    throw new Error("Error creating PearDrive instance", error);
  }
}
