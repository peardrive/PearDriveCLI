import fs from "bare-fs";

import * as C from "../../@constants";
import * as log from "../../@log";

/** Retrieve parsed JSON data from save file */
export function getAll() {
  log.info("Getting save data");
  try {
    if (fs.existsSync(C.SAVE_FILE)) {
      return JSON.parse(fs.readFileSync(C.SAVE_FILE));
    }
  } catch (error) {
    log.error("Error getting save data", error);
    console.error("Error getting save data", error);
    throw new Error(error);
  }
}
