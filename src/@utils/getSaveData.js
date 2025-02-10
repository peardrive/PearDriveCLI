import fs from "bare-fs";

import * as C from "../@constants";

/** Retrieve parsed JSON data from save file */
export function getSaveData() {
  if (fs.existsSync(C.SAVE_FILE)) {
    return JSON.parse(fs.readFileSync(C.SAVE_FILE));
  }
  return null;
}
