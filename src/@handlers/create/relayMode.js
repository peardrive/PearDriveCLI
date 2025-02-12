import * as utils from "../../@utils";
import * as C from "../../@constants";
import * as log from "../../@log";
import globalState from "../../@globalState";
import { create } from "..";

/** CREATE.RELAY_MODE request handler */
export function req() {
  log.info("Requesting CREATE.RELAY_MODE");
  utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.CREATE.RELAY_MODE;
  console.log("Enter relay mode(T/f):");
}

/** CREATE.RELAY_MODE response handler */
export function res(response) {
  log.info("Handling CREATE.RELAY_MODE with:", response);
  // Check for existing networkKey
  let networkKey = undefined;
  if (Object.keys(globalState.createNewPearDriveArgs).includes("networkKey")) {
    networkKey = globalState.createNewPearDriveArgs["networkKey"];
  }

  let relayMode = true;
  if (response === "f" || response === "false") relayMode = false;

  globalState.createNewPearDriveArgs = {
    corestorePath: C.CORESTORE_DIR,
    localDrivePath: C.LOCALDRIVE_DIR,
    relayMode,
    networkKey,
  };

  create.localDrivePath.req();
}
