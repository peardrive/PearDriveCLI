import fs from "bare-fs";

import * as C from "../@constants";
import * as utils from ".";

/** Create Corestore folder for given PearDrive instance */
export function createCorestoreFolder() {
  const folderPath = utils.createNewFolderPath(C.CORESTORE_DIR);
  fs.mkdirSync(folderPath, { recursive: true });

  return folderPath;
}
