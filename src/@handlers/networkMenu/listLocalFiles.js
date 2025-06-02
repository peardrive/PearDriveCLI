import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import * as handlers from "..";

/** NETWORK_MENU.LOCAL request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Handling NETWORK_MENU.LOCAL");
  clear && utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.LOCAL;

  const pearDrive = globalState.getSelectedPearDrive();
  if (!pearDrive) {
    console.log("No PearDrive selected");
    handlers.mainMenu.req(false);
    return;
  }

  const localFiles = pearDrive.listLocalFiles();
  globalState.localFiles = localFiles;
  console.log("Local PearDrive files:");
  localFiles.length === 0
    ? console.log("No local PearDrive files found.")
    : localFiles.forEach((file, index) => {
        console.log(`${index}. ${file}`);
      });

  console.log("=== Enter any key to return to the main menu ===");
}

/** NETWORK_MENU.LOCAL response handler
 *
 * @param {string} response
 */
export function res(response) {
  log.info("Handling NETWORK_MENU.LOCAL with:", response);
  handlers.mainMenu.req();
}
