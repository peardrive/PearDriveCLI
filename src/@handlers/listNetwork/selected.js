import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import { mainMenu } from "..";
import * as all from "./all";

/** LIST_NETWORK.selected request handler */
export function req() {
  log.info("Requesting LIST_NETWORK.selectedNetwork");
  utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.LIST_NETWORK.SELECTED;

  // Ensure there is a selected PearDrive
  if (!globalState.selectedPearDrive) {
    console.log("No PearDrive network selected");
    all.req();
    return;
  }

  // Ensure selected PearDrive exists
  if (!globalState.pearDrives.length) {
    // TODO
  }

  globalState.pearDrives
    .map((pearDrive, index) => {
      const pearDriveData = pearDrive.getSaveData();
      console.log(`${index}. Network key: ${pearDriveData.networkKey}`);
    })
    .join(" ");

  console.log("------------------");
  console.log(
    "Select a network by entering its number or 'exit' to return to the main menu."
  );
}

/** LIST_NETWORK.SELECTED response handler */
export function res(response) {}
