import readline from "bare-readline";
import tty from "bare-tty";
import fs from "bare-fs";
import process from "bare-process";
import path from "bare-path";

import * as C from "../constants";
import * as utils from ".";

/** Remove save data from save file */
export function removeSave(networkKey) {
  const data = utils.getSaveData();
  if (data) {
    const newData = data.filter((d) => d.networkKey !== networkKey);
    fs.writeFileSync(C.SAVE_FILE, JSON.stringify(newData));
  }
}
