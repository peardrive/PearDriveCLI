import fs from "bare-fs";

import * as C from "../constants";

/** Create Corestore folder for given PearDrive instance */
export function createCorestoreFolder() {
  const folderPath = createNewFolderPath(C.CORESTORE_DIR);
  fs.mkdirSync(folderPath, { recursive: true });

  return folderPath;
}
