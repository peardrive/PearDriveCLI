import globalState from "../../@globalState";
import * as utils from "..";
import * as log from "../../@log";

/** Delete a specific PearDrive network save data
 *
 * @param {string } networkKey - The network key of the PearDrive to delete
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} - If an error occurs while deleting the PearDrive network
 */
export async function destroy(networkKey) {
  log.info("Deleting saved PearDrive network data", networkKey);

  try {
    const pearDrive = globalState.getPearDrive(networkKey);
    log.debug("PearDrive to delete", pearDrive);

    if (pearDrive) globalState.removePearDrive(networkKey);
    //utils.removeSave(networkKey);
  } catch (error) {
    log.error("Error deleting PearDrive network", networkKey, error);
    console.error("Error deleting PearDrive network", networkKey, error);
    throw new Error(error);
  }
}
