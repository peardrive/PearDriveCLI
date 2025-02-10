import globalState from "./globalState";
import * as utils from "./utils";

/** Delete a specific PearDrive network save data */
export async function deletePearDrive(networkKey) {
  log.info("Deleting saved PearDrive network data", networkKey);
  const pearDrive = globalState.pearDrives.find(
    (d) => d.networkKey === networkKey
  );
  if (pearDrive) {
    await pearDrive.close();
    globalState.pearDrives = globalState.pearDrives.filter(
      (d) => d !== pearDrive
    );
    // TODO fix ^^^
  }
  utils.removeSave(networkKey);
}
