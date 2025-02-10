import readline from "bare-readline";
import tty from "bare-tty";
import fs from "bare-fs";
import process from "bare-process";

import * as C from "../constants";
import * as utils from ".";

/** Add save data to save file */
export function addSave(saveData) {
  const data = utils.getSaveData();
  if (data) {
    data.push(saveData);
    fs.writeFileSync(C.SAVE_FILE, JSON.stringify(data));
  } else {
    fs.writeFileSync(C.SAVE_FILE, JSON.stringify([saveData]));
  }
}
