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
let pearDriveArgs = {};

/** Selected network (an index on the pearDrives a  rray) */
let selectedNetwork = -1;

/** Current state of CLI */
let currentState = C.CLI_STATE.MAIN;

////////////////////////////////////////////////////////////////////////////////
// Util functions
////////////////////////////////////////////////////////////////////////////////

/** On CLI startup */
async function initialize() {
  currentState = C.CLI_STATE.INITIALIZING;
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
  log.info("Creating new PearDrive instance", pearDriveArgs);

  try {
    const corestorePath = utils.createCorestoreFolder();
    const logFilePath = utils.createCoreLogFile();
    pearDriveArgs.corestorePath = corestorePath;
    pearDriveArgs.logToFile = true;
    pearDriveArgs.logFilePath = logFilePath;
    const drive = new PearDrive(pearDriveArgs);
    await drive.ready();
    await drive.joinNetwork(pearDriveArgs.networkKey);

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
    await drive.joinNetwork(saveData.networkKey);

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
  utils.clearTerminal();
  currentState = C.CLI_STATE.MAIN;
  console.log(
    "Welcome to PearDrive CLI\n\
Enter 'quit' at any time to end the process\n\
  1. 'create' Create new PearDrive\n\
  2. 'join' Join existing PearDrive network\n\
  3. 'list' List all saved PearDrive networks\n\
  4. 'delete' Delete a saved PearDrive network\n\
  0. 'exit' Exit"
  );
}

/** MAIN response handler */
function resMainMenu(response) {
  switch (response) {
    // Create new PearDrive
    case "1":
    case "create":
      reqCreateRelayMode();
      break;

    // Join existing PearDrive network
    case "2":
    case "join":
      reqJoinExistingNetworkKey();
      break;

    // List all PearDrive networks
    case "3":
    case "list":
      reqListNetworkAll();
      break;

    // Delete a PearDrive network
    case "4":
    case "delete":
      reqDeleteNetworkSelect();
      break;

    // Stop program
    case "0":
    case "exit":
      process.kill(process.pid, "SIGINT");
      break;

    default:
      console.log("Invalid input, please try again");
      break;
  }
}

////////////////////////////////////////////////////////////////////////////////
// CREATE.RELAY_MODE

/** CREATE.RELAY_MODE prompt */
function reqCreateRelayMode() {
  utils.clearTerminal();
  currentState = C.CLI_STATE.CREATE.RELAY_MODE;
  console.log("Enter relay mode(T/f):");
}

/** CREATE.RELAY_MODE response handler */
function resCreateRelayMode(response) {
  // Check for existing networkKey
  let networkKey = undefined;
  if (Object.keys(pearDriveArgs).includes("networkKey")) {
    networkKey = pearDriveArgs["networkKey"];
  }

  let relayMode = true;
  if (response === "f" || response === "false") relayMode = false;

  pearDriveArgs = {
    corestorePath: C.CORESTORE_DIR,
    localDrivePath: C.LOCALDRIVE_DIR,
    relayMode,
    networkKey,
  };

  reqCreateLocaldrivePath();
}

////////////////////////////////////////////////////////////////////////////////
// CREATE.LOCALDRIVE_PATH

/** CREATE.LOCALDRIVE_PATH prompt */
function reqCreateLocaldrivePath() {
  utils.clearTerminal();
  currentState = C.CLI_STATE.CREATE.LOCALDRIVE_PATH;
  console.log("Enter local drive path (blank for random in default folder):");
}

/** CREATE.LOCALDRIVE_PATH response handler */
function resCreateLocaldrivePath(response) {
  if (response.length) pearDriveArgs.localDrivePath = response;
  else {
    fs.mkdirSync(path.join(C.LOCALDRIVE_DIR, "default"), { recursive: true });
    pearDriveArgs.localDrivePath = path.join(C.LOCALDRIVE_DIR, "default");
  }

  createPearDrive().then(() => {
    reqMainMenu();
  });
}

////////////////////////////////////////////////////////////////////////////////
// JOIN_EXISTING.NETWORK_KEY

/** JOIN_EXISTING.NETWORK_KEY prompt */
function reqJoinExistingNetworkKey() {
  utils.clearTerminal();
  currentState = C.CLI_STATE.JOIN_EXISTING.NETWORK_KEY;
  console.log("Enter network key:");
}

/** JOIN_EXISTING.NETWORK_KEY response handler */
function resJoinExistingNetworkKey(response) {
  pearDriveArgs.networkKey = response;
  reqCreateRelayMode();
}

////////////////////////////////////////////////////////////////////////////////
// LIST_NETWORK.ALL

/** LIST_NETWORK.all prompt */
function reqListNetworkAll() {
  utils.clearTerminal();
  currentState = C.CLI_STATE.LIST_NETWORK.ALL;
  if (!pearDrives.length) {
    console.log("No saved PearDrive networks");
    reqMainMenu();
    return;
  }

  pearDrives
    .map((pearDrive) => {
      const pearDriveData = pearDrive.getSaveData();
      const index = pearDrives.indexOf(pearDrive);

      console.log("PearDrive", index);
      console.log(
        "Connection:",
        pearDrive.connected ? "Connected" : "Disconnected"
      );
      console.log("Peer seed:", pearDriveData.seed);
      console.log("Network key:", pearDriveData.networkKey);
      console.log("Local drive path:", pearDriveData.localDrivePath);
      console.log("Relay mode:", pearDriveData.relayMode);
      console.log("-----------------");
    })
    .join(" ");

  console.log("------------------");
  console.log("Press enter to return to the main menu.");
}

/** LIST_NETWORK.ALL response handler  */
function resListNetworkAll(res) {
  reqMainMenu();
}

////////////////////////////////////////////////////////////////////////////////
// DELETE_NETWORK.SELECT

/** DELETE_NETWORK.SELECT prompt */
function reqDeleteNetworkSelect() {
  utils.clearTerminal();
  // Get peardrive data
  const pearDriveData = pearDrives.map((drive) => {
    const saveData = drive.getSaveData();
    const pdData = {
      key: saveData.networkKey,
      nickname: saveData.networkNickname.name,
    };
    return pdData;
  });

  console.log("Data", pearDriveData);
}

/** DELETE_NETWORK.SELECT response handler */
function resDeleteNetworkSelect(res) {
  reqMainMenu();
}

////////////////////////////////////////////////////////////////////////////////
// I/O
////////////////////////////////////////////////////////////////////////////////

rl.on("data", async (res) => {
  if (res === "quit()") process.kill(process.pid, "SIGINT");

  switch (currentState) {
    case C.CLI_STATE.INITIALIZING:
      break;

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
      resJoinExistingNetworkKey(res);
      break;

    case C.CLI_STATE.LIST_NETWORK.ALL:
      resListNetworkAll();
      break;

    case C.CLI_STATE.DELETE_NETWORK.SELECT:
      resDeleteNetworkSelect(res);
      break;

    default:
      resMainMenu(res);
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
  reqMainMenu();
}

main();
