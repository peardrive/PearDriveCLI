import globalState from "../../@globalState";
import * as utils from "..";
import * as log from "../../@log";

/** Delete a specific PearDrive network save data */
export async function deleteDrive(networkKey) {
  log.info("Deleting saved PearDrive network data", networkKey);

  try {
    const pearDrive = globalState.pearDrives.find(
      (d) => d.getSaveData().networkKey === networkKey
    );
    log.debug("PearDrive to delete", pearDrive);

    if (pearDrive) {
      await pearDrive.close();
      globalState.pearDrives = globalState.pearDrives.filter(
        (d) => d !== pearDrive
      );
    }
    utils.removeSave(networkKey);
  } catch (error) {
    log.error("Error deleting PearDrive network", networkKey, error);
    console.error("Error deleting PearDrive network", networkKey, error);
    throw new Error(error);
  }
}
