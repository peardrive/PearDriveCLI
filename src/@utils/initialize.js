import fs from "bare-fs";

import * as utils from ".";
import * as log from "../@log";
import * as C from "../@constants";

/** Initialize PearDrive CLI */
export async function initialize() {
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
      await utils.loadPearDrive(network);
      console.log("Loaded PearDrive network", network.networkKey);
      log.info("Loaded PearDrive network", network.networkKey);
    }
  }

  log.info("PearDrive CLI initialized");
}
