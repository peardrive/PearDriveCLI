import fs from "bare-fs";

import * as C from "./constants.js";

/** Retrieve parsed JSON data from save file */
export function getSaveData() {
  if (fs.existsSync(C.SAVE_FILE)) {
    return JSON.parse(fs.readFileSync(C.SAVE_FILE));
  }
  return null;
}

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

/** Remove save data from save file */
export function removeSave(networkKey) {
  const data = getSaveData();
  if (data) {
    const newData = data.filter((d) => d.networkKey !== networkKey);
    fs.writeFileSync(C.SAVE_FILE, JSON.stringify(newData));
  }
}
