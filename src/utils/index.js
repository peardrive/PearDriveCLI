import fs from "bare-fs";
import path from "bare-path";

import * as C from "../constants";

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

/** Clear terminal text */
export function clearTerminal() {
  console.log("\x1B[2J\x1B[0f");
}

export function generateString(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function createRandomFile(basePath, length = 8) {
  const name = `${generateString(length)}.txt`;
  const path = `${basePath}/${name}`;
  const contents = generateString(length);

  fs.writeFileSync(path, contents);
  return {
    name,
    path,
    contents,
  };
}

export function createCorestoreFolder() {
  const folderPath = createNewFolderPath(C.CORESTORE_DIR);
  fs.mkdirSync(folderPath, { recursive: true });

  return folderPath;
}

export function createCoreLogFile(name = generateString()) {
  const filePath = path.join(C.CORE_LOG_DIR, `${name}.log`);
  console.log("Log file created at", filePath);
  return filePath;
}

export function createNewFolderPath(basePath, length = 8) {
  return path.join(basePath, generateString(length));
}
