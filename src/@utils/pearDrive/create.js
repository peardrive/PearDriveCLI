import PearDrive from "peardrive-core-alpha";

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
      logToFile: true,
      corestorePath,
      logFilePath,
    };

    // Initialize and configure drive
    log.debug(
      "Creating PearDrive instance with the following settings:",
      JSON.stringify(globalState.createNewPearDriveArgs)
    );
    const drive = new PearDrive(globalState.createNewPearDriveArgs);
    await drive.ready();
    await drive.joinNetwork(
      globalState.createNewPearDriveArgs.networkKey || null
    );

    // Add to save data
    const saveData = drive.getSaveData();
    await utils.pearDrive.save(saveData);

    // Add to global state
    globalState.pearDrives.push(drive);
  } catch (error) {
    log.error("Error creating PearDrive instance", error);
    console.error("Error creating PearDrive instance", error);
    globalState.currentState = C.CLI_STATE.MAIN;
    throw new Error("Error creating PearDrive instance", error);
  }
}
