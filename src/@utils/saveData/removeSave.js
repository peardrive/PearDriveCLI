import fs from "bare-fs";

import * as C from "../../@constants";
import * as utils from "..";
import * as log from "../../@log";

/** Remove save data from save file
 *
 * @param {Object | string} saveData - The save data to remove, or just the
 * network key as a string
 */
export function removeSave(saveData) {
  log.info("Removing save data");
  log.debug("Save data to remove:", saveData);

  try {
    const data = utils.saveData.getAll();
    const networkKey = saveData.networkKey;
    if (data) {
      const newData = data.filter((d) => d.networkKey !== networkKey);
      console.log("New save data", newData);
      fs.writeFileSync(C.SAVE_FILE, JSON.stringify(newData));
    }
  } catch (error) {
    console.error("Error removing save data", error);
    log.error("Error removing save data", error);
    throw new Error(error);
  }
}
