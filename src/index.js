/** @typedef {import('pear-interface')} */ /* global Pear */
import readline from "bare-readline";
import tty from "bare-tty";
import path from "bare-path";
import fs from "bare-fs";
import process from "bare-process";
import PearDrive from "peardrive-core-alpha";

import * as C from "./constants.js";
import * as utils from "./utils.js";
import * as log from "./log.js";

////////////////////////////////////////////////////////////////////////////////
// Globals
////////////////////////////////////////////////////////////////////////////////

/** I/O interface */
const rl = readline.createInterface({
  input: new tty.ReadStream(0),
  output: new tty.WriteStream(1),
});

/** Running PearDrive instances */
let pearDrives = [];

/** PearDrive arguments for PearDrive to be created */
let pearDriveArgs = undefined;

/** Current state of CLI */
let currentState = C.CLI_STATE.MAIN;

////////////////////////////////////////////////////////////////////////////////
// Util functions
////////////////////////////////////////////////////////////////////////////////

/** On CLI startup */
async function initialize() {
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

  // Load PearDrive networks if any exist
  if (fs.existsSync(C.SAVE_FILE)) {
  }

  // Load PearDrive networks (if any exist)
  const data = utils.getSaveData();
  if (data) {
    log.info("Save data found, loading PearDrive networks");
    for (const network of data) {
      await loadPearDrive(network);
    }
  }

  log.info("PearDrive CLI initialized");
}

/** Create a new PearDrive instance */
async function createPearDrive() {
  log.info("Creating new PearDrive instance", pearDriveArgs);

  try {
    const drive = new PearDrive(pearDriveArgs);
    await drive.ready();
    await drive.joinNetwork();

    const saveData = drive.getSaveData();
    savePearDrive(saveData);

    pearDrives.push(drive);
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
    await drive.joinNetwork();

    pearDrives.push(drive);
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
  const pearDrive = pearDrives.find((d) => d.networkKey === networkKey);
  if (pearDrive) {
    await pearDrive.close();
    pearDrives = pearDrives.filter((d) => d !== pearDrive);
  }
  utils.removeSave(networkKey);
}

////////////////////////////////////////////////////////////////////////////////
// Interface functions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// MAIN MENU

/** MAIN text */
function reqMainMenu() {
  currentState = C.CLI_STATE.MAIN;
  console.log(
    "Welcome to PearDrive CLI\n\
Enter 'quit' at any time to end the process\n\
    1. Create new PearDrive\n\
    2. Join existing PearDrive network\n\
    3. List all saved PearDrive networks\n\
    4. Delete a saved PearDrive network\n\
    0. Exit"
  );
}

/** MAIN response handler */
function resMainMenu(response) {
  switch (response) {
    case "1": // Create new PearDrive
      reqCreateRelayMode();
      break;

    case "2": // Join existing PearDrive network
      currentState = C.CLI_STATE.JOIN_EXISTING.NETWORK_KEY;
      console.log("Enter network key:");
      break;

    case "3": /// List all PearDrive networks
      break;

    case "4": // Delete a PearDrive network
      break;

    case "0":
      process.kill(process.pid, "SIGINT");
      break;
    default:
      console.log("Invalid input, please try again");
  }
}

////////////////////////////////////////////////////////////////////////////////
// CREATE.RELAY_MODE

/** CREATE.RELAY_MODE prompt */
function reqCreateRelayMode() {
  currentState = C.CLI_STATE.CREATE.RELAY_MODE;
  console.log("Enter relay mode(T/f):");
}
/** CREATE.RELAY_MODE response handler */
function resCreateRelayMode(response) {
  //
  if (response === "f" || response === "false") {
    pearDriveArgs = {
      corestorePath: C.CORESTORE_DIR,
      localDrivePath: C.LOCALDRIVE_DIR,
      relayMode: false,
    };
  } else {
    pearDriveArgs = {
      corestorePath: C.CORESTORE_DIR,
      localDrivePath: C.LOCALDRIVE_DIR,
      relayMode: true,
    };
  }

  reqCreateLocaldrivePath();
}

////////////////////////////////////////////////////////////////////////////////
// CREATE.LOCALDRIVE_PATH

function reqCreateLocaldrivePath() {
  currentState = C.CLI_STATE.CREATE.LOCALDRIVE_PATH;
  console.log("Enter local drive path (blank for random in default folder):");
}

/** CREATE.LOCALDRIVE_PATH response handler */
function resCreateLocaldrivePath(response) {
  if (response.length) pearDriveArgs.localDrivePath = response;
  else pearDriveArgs.localDrivePath = path.join(C.LOCALDRIVE_DIR, "default");
  createPearDrive();
}

////////////////////////////////////////////////////////////////////////////////
// Main
////////////////////////////////////////////////////////////////////////////////

initialize();

reqMainMenu();
rl.on("data", async (res) => {
  if (res === "quit") process.kill(process.pid, "SIGINT");

  switch (currentState) {
    case C.CLI_STATE.MAIN:
      resMainMenu(res);
      break;

    case C.CLI_STATE.CREATE.RELAY_MODE:
      resCreateRelayMode(res);
      break;

    case C.CLI_STATE.CREATE.LOCALDRIVE_PATH:
      resCreateLocaldrivePath(res);
      break;

    case C.CLI_STATE.JOIN_EXISTING.NETWORK_KEY:
      // Join existing network
      break;
  }
  //
});

rl.on("close", () => {
  process.kill(process.pid, "SIGINT");
});
