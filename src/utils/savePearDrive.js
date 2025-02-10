export * as utils from "../utils";

/** Save a new PearDrive network data */
export async function savePearDrive(saveData) {
  log.info("Saving PearDrive network data", saveData.networkKey);
  utils.addSave(saveData);
}
