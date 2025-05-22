import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import { mainMenu } from "..";
import * as handlers from "..";

/** LIST_NETWORK.all request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting LIST_NETWORK.ALL");
  clear && utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.LIST_NETWORK.ALL;
  if (!globalState.pearDrives.length) {
    console.log("No saved PearDrive networks");
    mainMenu.req();
    return;
  }

  globalState.pearDrives
    .map((pearDrive) => {
      const pearDriveData = pearDrive.getSaveData();
      const index = globalState.pearDrives.indexOf(pearDrive);

      console.log("PearDrive", index);
      utils.logPearDrive(pearDriveData, pearDrive.connected);
    })
    .join(" ");

  console.log("Enter the PearDrive number to select it.");
  console.log("Enter 'main' to return to the main menu.");
}

/** LIST_NETWORK.ALL response handler  */
export function res(response) {
  log.info("Handling LIST_NETWORK.ALL with:", response);

  // Validate input
  if (
    isNaN(response) ||
    response < 0 ||
    response >= globalState.pearDrives.length
  ) {
    console.log("Invalid input. Please enter a number.");
    log.error("Invalid input in LIST_NETWORK.ALL");
    req(false);
    return;
  }

  // Select PearDrive
  try {
    globalState.selectedPearDrive = parseInt(response);
    handlers.listNetwork.selected.req();
  } catch (error) {
    log.error("Error selecting PearDrive in LIST_NETWORK.ALL", error);
    req(false);
  }
}
