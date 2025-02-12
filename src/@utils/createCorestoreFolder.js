import fs from "bare-fs";

import * as C from "../@constants";
import * as utils from ".";
import * as log from "../@log";

/** Create Corestore folder for given PearDrive instance */
export function createCorestoreFolder() {
  try {
    const folderPath = utils.createNewFolderPath(C.CORESTORE_DIR);
    log.info("Creating Corestore folder at", folderPath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      log.debug("Corestore folder created at", folderPath);
    } else {
      log.warn("Corestore folder already exists at", folderPath);
    }

    return folderPath;
  } catch (error) {
    log.error("Error creating Corestore folder", error);
    console.error("Error creating Corestore folder", error);
    throw new Error(error);
  }
}
