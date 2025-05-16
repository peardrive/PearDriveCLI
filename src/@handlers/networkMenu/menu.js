import process from "bare-process";

import globalState from "../../@globalState";
import * as C from "../../@constants";
import * as utils from "../../@utils";
import * as log from "../../@log";
import * as handlers from "..";

/** NETWORK_MENU.MENU request handler
 *
 */
export function req() {
  if (!globalState.selectedPearDrive) {
    console.log("No PearDrive selected");
    handlers.listNetwork.all.req(false);
    return;
  }

  const curPearDrive = globalState.pearDrives[globalState.selectedPearDrive];

  //TODO
}

export function res() {
  //TODO
}
