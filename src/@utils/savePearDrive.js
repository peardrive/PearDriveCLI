export * as utils from ".";
import * as log from "../@log";

/** Save a new PearDrive network data */
export async function savePearDrive(saveData) {
  log.info("Saving PearDrive network data", saveData.networkKey);
  utils.addSave(saveData);
}
