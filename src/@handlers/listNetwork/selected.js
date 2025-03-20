import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import { mainMenu } from "..";
import * as all from "./all";

/**
 * LIST_NETWORK.selected request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting LIST_NETWORK.selectedNetwork");
  clear && utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.LIST_NETWORK.SELECTED;

  // Ensure there is a selected PearDrive
  if (!globalState.selectedPearDrive) {
    console.log("No PearDrive network selected");
    all.req();
    return;
  }

  // Ensure selected PearDrive exists
  if (!globalState.pearDrives.length) {
    console.log("No PearDrive networks found");
    all.req();
    return;
  }

  try {
    // Get selected PearDrive and log data
    const selectedPearDrive =
      globalState.pearDrives[globalState.selectedPearDrive];
    const saveData = selectedPearDrive.getSaveData();
    utils.logPearDrive(saveData, true);

    // Options / controls
    console.log("OPTIONS");
    console.log("-----------------");
    console.log("1. 'nickname' Change/set network nickname");
    console.log("2. 'delete' Delete network");
    console.log(
      `3. 'relay' turn relay mode ${saveData.relayMode ? "off" : "on"}`
    );
  } catch (error) {
    console.error("Error in LIST_NETWORK.selected", error);
    log.error("Error in LIST_NETWORK.selected", error);
    all.req(false);
  }
}

/** LIST_NETWORK.selected response handler */
export function res(response) {
  log.info("Handling LIST_NETWORK.selected with:", response);
}
