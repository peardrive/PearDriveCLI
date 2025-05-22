import qrcode from "qrcode-terminal";

import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import * as handlers from "..";

/** NETWORK_MENU.QR request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export function req(clear = true) {
  log.info("Requesting NETWORK_MENU.QR");
  if (clear) utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.QR;

  const pearDrive = globalState.getSelectedPearDrive();
  if (!pearDrive) {
    console.log("No PearDrive selected");
    handlers.mainMenu.req(false);
    return;
  }
  const networkKey = pearDrive.getSaveData().networkKey;

  qrcode.generate(networkKey, (qr) => {
    console.log("=== Scan this QR code to join the network ===\n");
    console.log(qr);
    console.log("\n=== Enter any key to return to the menu ===");
  });
}

export function res(response) {
  log.info("Handling NETWORK_MENU.QR with:", response);
  handlers.listNetwork.all.req();
}
