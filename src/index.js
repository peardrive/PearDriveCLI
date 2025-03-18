// /** @typedef {import('pear-interface')} */ /* global Pear */
import fs from "bare-fs";

import io from "./@io";
import * as C from "./@constants";
import * as log from "./@log";
import * as utils from "./@utils";
import * as handlers from "./@handlers";

////////////////////////////////////////////////////////////////////////////////
//  Setup methods
////////////////////////////////////////////////////////////////////////////////

/** Initialize PearDrive CLI */
async function initialize() {
  // Ensure folders exist
  if (!fs.existsSync(C.DATA_DIR)) {
    console.log("First time setup detected");
    console.log("Creating data directory at", C.DATA_DIR);
    fs.mkdirSync(C.DATA_DIR);
  }
  if (!fs.existsSync(C.CORESTORE_DIR)) {
    console.log("Creating corestore directory at", C.CORESTORE_DIR);
    fs.mkdirSync(C.CORESTORE_DIR);
  }
  if (!fs.existsSync(C.LOCALDRIVE_DIR)) {
    console.log("Creating localdrive directory at", C.LOCALDRIVE_DIR);
    fs.mkdirSync(C.LOCALDRIVE_DIR);
  }
  if (!fs.existsSync(C.SAVE_DIR)) {
    console.log("Creating save directory at", C.SAVE_DIR);
    fs.mkdirSync(C.SAVE_DIR);
  }
  if (!fs.existsSync(C.LOG_DIR)) {
    console.log("Creating log directory at", C.LOG_DIR);
    fs.mkdirSync(C.LOG_DIR);
  }
  if (!fs.existsSync(C.CORE_LOG_DIR)) {
    console.log("Creating core log directory at", C.CORE_LOG_DIR);
    fs.mkdirSync(C.CORE_LOG_DIR);
  }

  // Init logging
  if (fs.existsSync(C.LOG_FILE)) {
    console.log("Deleting log file at", C.LOG_FILE);
    fs.unlinkSync(C.LOG_FILE);
  }
  log.info("Initializing PearDrive CLI");
  console.log("Initializing PearDrive CLI");

  // Load PearDrive networks (if any exist)
  const data = utils.getSaveData();
  if (data) {
    log.info("Save data found, loading PearDrive networks");
    for (const network of data) {
      await utils.pearDrive.load(network);
      console.log("Loaded PearDrive network", network.networkKey);
      log.info("Loaded PearDrive network", network.networkKey);
    }
  }

  log.info("PearDrive CLI initialized");
  console.log("PearDrive CLI initialized");
  console.log("------------------------------------");
}

////////////////////////////////////////////////////////////////////////////////
//  Main
////////////////////////////////////////////////////////////////////////////////

/** Entry point function */
async function main() {
  try {
    await initialize();
    io();
    handlers.mainMenu.req(false);
  } catch (error) {
    console.error("Error in main", error);
    log.error("Error in main", error);
    utils.exit();
  }
}

main();
