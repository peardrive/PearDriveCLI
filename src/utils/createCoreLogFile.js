import path from "bare-path";

import * as C from "../constants";

/** Create log file for an instance of PearDrive core */
export function createCoreLogFile(name = generateString()) {
  const filePath = path.join(C.CORE_LOG_DIR, `${name}.log`);
  console.log("Log file created at", filePath);
  return filePath;
}
