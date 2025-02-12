import fs from "bare-fs";

import * as C from "../@constants";
import * as utils from ".";
import * as log from "../@log";

/** Remove save data from save file */
export function removeSave(networkKey) {
  log.info("Removing save data");
  try {
    const data = utils.getSaveData();
    if (data) {
      const newData = data.filter((d) => d.networkKey !== networkKey);
      fs.writeFileSync(C.SAVE_FILE, JSON.stringify(newData));
    }
  } catch (error) {
    console.error("Error removing save data", error);
    log.error("Error removing save data", error);
    throw new Error(error);
  }
}
