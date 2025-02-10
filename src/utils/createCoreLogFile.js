import path from "bare-path";
import readline from "bare-readline";
import tty from "bare-tty";
import fs from "bare-fs";
import process from "bare-process";

import * as C from "../constants";

/** Create log file for an instance of PearDrive core */
export function createCoreLogFile(name = generateString()) {
  const filePath = path.join(C.CORE_LOG_DIR, `${name}.log`);
  console.log("Log file created at", filePath);
  return filePath;
}
