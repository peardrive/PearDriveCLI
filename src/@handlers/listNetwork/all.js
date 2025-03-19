import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import { mainMenu } from "..";

/**
 * LIST_NETWORK.all request handler
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
      console.log(
        "Connection:",
        pearDrive.connected ? "Connected" : "Disconnected"
      );
      pearDriveData.networkNickname &&
        console.log("Network nickname:", pearDriveData.networkNickname);
      console.log("Peer seed:", pearDriveData.seed);
      console.log("Network key:", pearDriveData.networkKey);
      console.log("Local drive path:", pearDriveData.localDrivePath);
      console.log("Relay mode:", pearDriveData.relayMode);
      console.log("-----------------");
    })
    .join(" ");

  console.log("Enter the PearDrive number to select it.");
  console.log("Enter 'main' to return to the main menu.");
}

/** LIST_NETWORK.ALL response handler  */
export function res(response) {
  log.info("Handling LIST_NETWORK.ALL with:", response);

  // Go to main menu
  if (response === "main") {
    mainMenu.req();
    return;
  }

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
  } catch (error) {
    log.error("Error selecting PearDrive in LIST_NETWORK.ALL", error);
    req(false);
  }
}
