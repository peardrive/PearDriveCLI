import readline from "bare-readline";
import tty from "bare-tty";
import fs from "bare-fs";
import process from "bare-process";
import path from "bare-path";

import * as C from "../constants";

/** Retrieve parsed JSON data from save file */
export function getSaveData() {
  if (fs.existsSync(C.SAVE_FILE)) {
    return JSON.parse(fs.readFileSync(C.SAVE_FILE));
  }
  return null;
}
