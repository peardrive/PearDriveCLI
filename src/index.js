/** @typedef {import('pear-interface')} */ /* global Pear */
import fs from "bare-fs";

import globalState from "./globalState";
import * as C from "./constants";
import * as utils from "./utils";
import * as log from "./log";
import * as handlers from "./handlers";

////////////////////////////////////////////////////////////////////////////////
// Main
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
      await utils.loadPearDrive(network);
      console.log("Loaded PearDrive network", network.networkKey);
      log.info("Loaded PearDrive network", network.networkKey);
    }
  }

  log.info("PearDrive CLI initialized");
}

/** Entry point function */
async function main() {
  await initialize();
  const _rl = utils.configureIO();
  handlers.mainMenu.req();
}

main();
