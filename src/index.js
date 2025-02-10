/** @typedef {import('pear-interface')} */ /* global Pear */
import readline from "bare-readline";
import tty from "bare-tty";
import path from "bare-path";
import fs from "bare-fs";
import process from "bare-process";
import PearDrive from "peardrive-core-alpha";

import globalState from "./globalState";
import * as C from "./constants";
import * as utils from "./utils";
import * as log from "./log";
import * as handlers from "./handlers";

////////////////////////////////////////////////////////////////////////////////
// Globals
////////////////////////////////////////////////////////////////////////////////

/** I/O interface */
const rl = readline.createInterface({
  input: new tty.ReadStream(0),
  output: new tty.WriteStream(1),
});

////////////////////////////////////////////////////////////////////////////////
// Util functions
////////////////////////////////////////////////////////////////////////////////

/** On CLI startup */
async function initialize() {
  globalState.currentState = C.CLI_STATE.INITIALIZING;
  // Ensure folders exist
  if (!fs.existsSync(C.DATA_DIR)) fs.mkdirSync(C.DATA_DIR);
  if (!fs.existsSync(C.CORESTORE_DIR)) fs.mkdirSync(C.CORESTORE_DIR);
  if (!fs.existsSync(C.LOCALDRIVE_DIR)) fs.mkdirSync(C.LOCALDRIVE_DIR);
  if (!fs.existsSync(C.SAVE_DIR)) fs.mkdirSync(C.SAVE_DIR);
  if (!fs.existsSync(C.LOG_DIR)) fs.mkdirSync(C.LOG_DIR);

  // Init logging
  if (fs.existsSync(C.LOG_FILE)) fs.unlinkSync(C.LOG_FILE);
  fs.writeFileSync(C.LOG_FILE, "");

  log.info("Initializing PearDrive CLI");
  console.log("Initializing PearDrive CLI");

  // Load PearDrive networks (if any exist)
  const data = utils.getSaveData();
  if (data) {
    log.info("Save data found, loading PearDrive networks");
    for (const network of data) {
      await loadPearDrive(network);
      console.log("Loaded PearDrive network", network.networkKey);
      log.info("Loaded PearDrive network", network.networkKey);
    }
  }

  log.info("PearDrive CLI initialized");
}

/** Create a new PearDrive instance */
async function createPearDrive() {
  log.info("Creating new PearDrive instance...");

  try {
    const corestorePath = utils.createCorestoreFolder();
    const logFilePath = utils.createCoreLogFile();
    globalState.createNewPearDriveArgs.corestorePath = corestorePath;
    globalState.createNewPearDriveArgs.logToFile = true;
    globalState.createNewPearDriveArgs.logFilePath = logFilePath;
    const drive = new PearDrive(createNewPearDriveArgs);
    await drive.ready();
    await drive.joinNetwork(globalState.createNewPearDriveArgs.networkKey);

    const saveData = drive.getSaveData();
    savePearDrive(saveData);

    globalState.pearDrives.push(drive);
  } catch (error) {
    log.error("Error creating PearDrive instance", error);
    console.error("Error creating PearDrive instance", error);
    currentState = C.CLI_STATE.MAIN;
    reqMainMenu();
  }
}

/** Load existing PearDrive instance from args */
async function loadPearDrive(saveData) {
  log.info("Loading PearDrive instance from save data", saveData.networkKey);

  try {
    const drive = new PearDrive(saveData);
    await drive.ready();
    await drive.joinNetwork(saveData.networkKey);

    globalState.pearDrives.push(drive);
  } catch (error) {
    log.error("Error loading PearDrive instance", error);
    console.error("Error loading PearDrive instance", error);
  }
}

/** Save a new PearDrive network data */
async function savePearDrive(saveData) {
  log.info("Saving PearDrive network data", saveData.networkKey);
  utils.addSave(saveData);
}

/** Delete a specific PearDrive network save data */
async function deletePearDrive(networkKey) {
  log.info("Deleting saved PearDrive network data", networkKey);
  const pearDrive = globalState.pearDrives.find(
    (d) => d.networkKey === networkKey
  );
  if (pearDrive) {
    await pearDrive.close();
    globalState.pearDrives = globalState.pearDrives.filter(
      (d) => d !== pearDrive
    );
    // TODO fix ^^^
  }
  utils.removeSave(networkKey);
}

////////////////////////////////////////////////////////////////////////////////
// I/O
////////////////////////////////////////////////////////////////////////////////

rl.on("data", async (res) => {
  if (res === "quit()") process.exit(0);

  switch (currentState) {
    case C.CLI_STATE.INITIALIZING:
      break;

    case C.CLI_STATE.MAIN:
      handlers.mainMenu.res(res);
      break;

    case C.CLI_STATE.CREATE.RELAY_MODE:
      handlers.mainMenu.res(res);
      break;

    case C.CLI_STATE.CREATE.LOCALDRIVE_PATH:
      handlers.create.localDrivePath.res(res);
      break;

    case C.CLI_STATE.JOIN_EXISTING.NETWORK_KEY:
      handlers.joinExisting.networkKey.res(res);
      break;

    case C.CLI_STATE.LIST_NETWORK.ALL:
      handlers.listNetwork.all.res(res);
      break;

    case C.CLI_STATE.DELETE_NETWORK.SELECT:
      handlers.deleteNetwork.select.res(res);
      break;

    default:
      handlers.mainMenu.res(res);
      break;
  }
  //
});

rl.on("close", () => {
  process.kill(process.pid, "SIGINT");
});

////////////////////////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////////////////////////

async function main() {
  await initialize();
  handlers.mainMenu.req();
}

main();
