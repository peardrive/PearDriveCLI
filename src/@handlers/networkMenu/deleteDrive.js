import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import * as handlers from "..";

/** NETWORK_MENU.DELETE_DRIVE request handler
 *
 * @param {boolean} clear
 */
export async function req(clear = true) {
  log.info("Requesting NETWORK_MENU.DELETE_DRIVE");
  if (clear) utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.DELETE_DRIVE;

  try {
    const pearDrive = globalState.getSelectedPearDrive();
    await pearDrive.close();
  } catch (error) {
    log.error("Error retrieving selected PearDrive", error);
    console.error("Error retrieving selected PearDrive", error);
  }
  console.log("PearDrive closed successfully.");
  globalState.removePearDrive(globalState.selectedPearDrive);

  console.log(
    `PearDrive with network key ${networkKey} has been deleted successfully.`
  );
  console.log("\n=== Enter any key to return to the main menu ===");
}

export function res() {
  log.info("Handling NETWORK_MENU.DELETE_DRIVE");
  handlers.mainMenu.req();
}
