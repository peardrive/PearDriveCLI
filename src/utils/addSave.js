import readline from "bare-readline";
import tty from "bare-tty";
import fs from "bare-fs";
import process from "bare-process";

import * as C from "../constants";
import { getSaveData } from "./getSaveData";

/** Add save data to save file */
export function addSave(saveData) {
  const data = getSaveData();
  if (data) {
    data.push(saveData);
    fs.writeFileSync(C.SAVE_FILE, JSON.stringify(data));
  } else {
    fs.writeFileSync(C.SAVE_FILE, JSON.stringify([saveData]));
  }
}
