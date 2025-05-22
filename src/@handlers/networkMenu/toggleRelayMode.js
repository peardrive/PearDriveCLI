import * as handlers from "..";
import * as utils from "../../@utils";
import * as log from "../../@log";
import globalState from "../../@globalState";
import * as C from "../../@constants";

/** NETWORK_MENU.TOGGLE_RELAY_MODE handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting NETWORK_MENU.TOGGLE_RELAY_MODE");
  if (clear) utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.TOGGLE_RELAY_MODE;

  const pearDrive = globalState.getSelectedPearDrive();
  if (!pearDrive) {
    console.log("No PearDrive selected");
    handlers.mainMenu.req(false);
    return;
  }
  const saveData = pearDrive.getSaveData();
  const relayMode = saveData.relayMode;

  // Toggle relay mode
  relayMode ? pearDrive.deactivateRelayMode() : pearDrive.activateRelayMode();
  console.log(
    `Relay mode ${relayMode ? "disabled" : "enabled"} for network ${
      saveData.networkKey
    }`
  );
  console.log("\n=== Enter any key to return to the menu ===");
}

export function res(response) {
  log.info("Handling NETWORK_MENU.TOGGLE_RELAY_MODE with:", response);
  handlers.listNetwork.all.req();
}
