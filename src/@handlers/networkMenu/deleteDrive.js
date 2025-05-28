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

  const pearDrive = globalState.getSelectedPearDrive();
  if (!pearDrive) {
    console.log("No PearDrive selected");
    handlers.mainMenu.req(false);
    return;
  }
  const key = pearDrive.getSaveData().networkKey;
  await pearDrive.close();
  console.log("PearDrive closed successfully.");

  //await utils.pearDrive.deleteDrive(key);
  console.log(
    `PearDrive with network key ${networkKey} has been deleted successfully.`
  );
  console.log("\n=== Enter any key to return to the main menu ===");
}

export function res() {
  log.info("Handling NETWORK_MENU.DELETE_DRIVE");
  handlers.mainMenu.req();
}
