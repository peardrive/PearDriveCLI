import readline from "bare-readline";
import tty from "bare-tty";
import process from "bare-process";

import * as C from "../@constants";
import globalState from "../@globalState";
import * as handlers from "../@handlers";
import * as utils from ".";

/**
 * Set up readline IO interface
 *
 * @returns {ReadLine} readline interface
 */
export function configureIO() {
  /** I/O interface */
  const rl = readline.createInterface({
    input: new tty.ReadStream(0),
    output: new tty.WriteStream(1),
  });

  // Wire up event listener for user input
  rl.on("data", async (res) => {
    if (res === "quit()") utils.exit();

    const currentState = globalState.currentState;
    console.log("CurrentState", currentState);
    switch (currentState) {
      case C.CLI_STATE.INITIALIZING:
        break;

      case C.CLI_STATE.MAIN:
        handlers.mainMenu.res(res);
        break;

      case C.CLI_STATE.CREATE.RELAY_MODE:
        handlers.create.relayMode.res(res);
        break;

      case C.CLI_STATE.CREATE.LOCALDRIVE_PATH:
        handlers.create.localDrivePath.res(res);
        break;

      case C.CLI_STATE.JOIN_EXISTING.NETWORK_KEY:
        handlers.joinExisting.networkKey.res(res);
        break;

      case C.CLI_STATE.LIST_NETWORK.ALL:
        handlers.listNetwork.all.res(res);
        break;

      case C.CLI_STATE.DELETE_NETWORK.SELECT:
        handlers.deleteNetwork.select.res();
        break;

      default:
        handlers.mainMenu.res(res);
        break;
    }
    //
  });

  // Teardown
  rl.on("close", () => {
    utils.exit();
  });

  return rl;
}
