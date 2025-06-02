import fs from "bare-fs";

import * as C from "../../@constants";
import * as utils from "..";
import * as log from "../../@log";

/** Add save data to save file
 *
 * @param {Object} saveData - The save data to add
 *
 * @throws {Error} - If an error occurs while adding the save data
 */
export function addSave(saveData) {
  log.info("Adding save data");
  log.debug("Save data to add:", saveData);

  try {
    if (!saveData.networkKey) {
      throw new Error("Network key is required to save data");
    }
    const data = utils.saveData.getAll();
    if (data) {
      data.push(saveData);
      fs.writeFileSync(C.SAVE_FILE, JSON.stringify(data));
    } else fs.writeFileSync(C.SAVE_FILE, JSON.stringify([saveData]));
  } catch (error) {
    console.error("Error adding save data", error);
    log.error("Error adding save data", error);
    throw new Error(error);
  }
}
