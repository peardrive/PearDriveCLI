import path from "bare-path";

import * as C from "../@constants";
import * as log from "../@log";
import * as utils from ".";

/** Create log file for an instance of PearDrive core */
export function createCoreLogFile(name = utils.generateString()) {
  log.info("Creating core log file for", name);

  try {
    const filePath = path.join(C.CORE_LOG_DIR, `${name}.log`);
    log.debug("Core log file created at", filePath);
    return filePath;
  } catch (error) {
    log.error("Error creating core log file", error);
    console.error("Error creating core log file", error);
    throw new Error(error);
  }
}
