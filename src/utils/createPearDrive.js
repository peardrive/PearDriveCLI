import * as utils from ".";
import globalState from "../globalState";
import * as handlers from "../handlers";

/** Create a new PearDrive instance */
export async function createPearDrive() {
  log.info("Creating new PearDrive instance...");

  try {
    // Create PearDrive args
    const corestorePath = utils.createCorestoreFolder();
    const logFilePath = utils.createCoreLogFile();
    globalState.createNewPearDriveArgs.corestorePath = corestorePath;
    globalState.createNewPearDriveArgs.logToFile = true;
    globalState.createNewPearDriveArgs.logFilePath = logFilePath;

    // Initialize and configure drive
    const drive = new PearDrive(globalState.createNewPearDriveArgs);
    await drive.ready();
    await drive.joinNetwork(globalState.createNewPearDriveArgs.networkKey);

    const saveData = drive.getSaveData();
    savePearDrive(saveData);

    globalState.pearDrives.push(drive);
  } catch (error) {
    log.error("Error creating PearDrive instance", error);
    console.error("Error creating PearDrive instance", error);
    globalState.currentState = C.CLI_STATE.MAIN;
    handlers.mainMenu.req();
  }
}
