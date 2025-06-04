import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import * as all from "./all";
import * as handlers from "..";

/**
 * LIST_NETWORK.selected request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting LIST_NETWORK.SELECTED");
  clear && utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.LIST_NETWORK.SELECTED;

  // Ensure there is a selected PearDrive
  if (globalState.selectedPearDrive === null) {
    console.log("No PearDrive network selected");
    log.error("No PearDrive network selected");
    all.req();
    return;
  }

  // Ensure selected PearDrive exists
  if (!globalState.pearDrives.length) {
    console.log("No PearDrive networks found");
    log.error("No PearDrive networks found");
    all.req();
    return;
  }

  try {
    // Get selected PearDrive and log data
    const selectedPearDrive = globalState.getSelectedPearDrive();
    const saveData = selectedPearDrive.getSaveData();
    utils.logPearDrive(saveData, true);

    // Options / controls
    console.log("OPTIONS");
    console.log("-----------------");
    console.log("1. 'nickname' Change/set network nickname");
    console.log("2. 'qr' View network QR code");
    console.log(
      `3. 'relay' turn relay mode ${saveData.relayMode ? "off" : "on"}`
    );
    console.log("4. 'local' list all local PearDrive files");
    console.log("5. 'network' list all nonlocal PearDrive files");
    console.log("6. 'delete' Delete network");
    console.log("7. 'back' Return to network list");
  } catch (error) {
    console.error("Error in LIST_NETWORK.selected", error);
    log.error("Error in LIST_NETWORK.selected", error);
    all.req(false);
  }
}

/** LIST_NETWORK.selected response handler */
export function res(response) {
  log.info("Handling LIST_NETWORK.selected with:", response);
  switch (response) {
    case "1":
    case "nickname":
      handlers.networkMenu.setNetworkNickname.req();
      break;

    case "2":
    case "qr":
      handlers.networkMenu.qr.req();
      break;

    case "3":
    case "relay":
      handlers.networkMenu.toggleRelayMode.req();
      break;

    case "4":
    case "local":
      handlers.networkMenu.listLocalFiles.req();
      break;

    case "4":
    case "network":
      handlers.networkMenu.listNetworkFiles.req();
      break;

    case "6":
    case "delete":
      handlers.networkMenu.deleteDrive.req();
      break;

    case "7":
    case "back":
      console.log("Returning to LIST_NETWORK.all...");
      log.info("Returning to LIST_NETWORK.all from LIST_NETWORK.selected");
      all.req();
      break;

    default:
      console.log("Invalid input, please try again");
      break;
  }
}
