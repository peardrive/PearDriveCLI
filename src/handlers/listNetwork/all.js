import * as C from "../../constants";
import globalState from "../../globalState";
import * as utils from "../../utils";
import { mainMenu } from "..";

/** LIST_NETWORK.all request handler */
export function req() {
  utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.LIST_NETWORK.ALL;
  if (!globalState.pearDrives.length) {
    console.log("No saved PearDrive networks");
    reqMainMenu();
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
      console.log("Peer seed:", pearDriveData.seed);
      console.log("Network key:", pearDriveData.networkKey);
      console.log("Local drive path:", pearDriveData.localDrivePath);
      console.log("Relay mode:", pearDriveData.relayMode);
      console.log("-----------------");
    })
    .join(" ");

  console.log("------------------");
  console.log("Press enter to return to the main menu.");
}

/** LIST_NETWORK.ALL response handler  */
export function res(res) {
  mainMenu.req();
}
