import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import { create } from "..";

/** JOIN_EXISTING.NETWORK_KEY request handler */
export function req() {
  log.info("Requesting JOIN_EXISTING.NETWORK_KEY");
  utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.JOIN_EXISTING.NETWORK_KEY;
  console.log("Enter network key:");
}

/** JOIN_EXISTING.NETWORK_KEY response handler */
export function res(response) {
  log.info("Handling JOIN_EXISTING.NETWORK_KEY with:", response);
  globalState.createNewPearDriveArgs.networkKey = response;
  create.relayMode.req();
}
