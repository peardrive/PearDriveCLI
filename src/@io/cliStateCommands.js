import * as C from "../@constants";
import * as handlers from "../@handlers";
import globalState from "../@globalState";

/**
 * Handle CLI state commands for a given input
 *
 * @param {string} input - Input to handle
 *
 * @returns {boolean} - True if input is a CLI state command, false otherwise
 */
export function cliStateCommands(input) {
  switch (globalState.currentState) {
    case C.CLI_STATE.INITIALIZING:
      return false;

    case C.CLI_STATE.MAIN:
      handlers.mainMenu.res(input);
      return true;

    case C.CLI_STATE.CREATE.RELAY_MODE:
      handlers.create.relayMode.res(input);
      return true;

    case C.CLI_STATE.CREATE.LOCALDRIVE_PATH:
      handlers.create.localDrivePath.res(input);
      return true;

    case C.CLI_STATE.JOIN_EXISTING.NETWORK_KEY:
      handlers.joinExisting.networkKey.res(input);
      return true;

    case C.CLI_STATE.LIST_NETWORK.ALL:
      handlers.listNetwork.all.res(input);
      return true;

    case C.CLI_STATE.LIST_NETWORK.SELECTED:
      handlers.listNetwork.selected.res(input);
      return true;

    case C.CLI_STATE.NETWORK_MENU.QR:
      handlers.networkMenu.qr.res(input);
      return true;

    case C.CLI_STATE.NETWORK_MENU.SET_NETWORK_NICKNAME:
      handlers.networkMenu.setNetworkNickname.res(input);
      return true;

    case C.CLI_STATE.NETWORK_MENU.TOGGLE_RELAY_MODE:
      handlers.networkMenu.toggleRelayMode.res(input);
      return true;

    default:
      return false;
  }
}
