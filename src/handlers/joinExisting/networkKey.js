import readline from "bare-readline";
import tty from "bare-tty";
import fs from "bare-fs";
import process from "bare-process";
import path from "bare-path";

import * as C from "../../constants";
import globalState from "../../globalState";
import * as utils from "../../utils";
import { create } from "..";

/** JOIN_EXISTING.NETWORK_KEY request handler */
export function req() {
  utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.JOIN_EXISTING.NETWORK_KEY;
  console.log("Enter network key:");
}

/** JOIN_EXISTING.NETWORK_KEY response handler */
export function res(response) {
  globalState.createNewPearDriveArgs.networkKey = response;
  create.relayMode.req();
}
