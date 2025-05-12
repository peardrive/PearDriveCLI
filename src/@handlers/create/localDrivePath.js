import fs from "bare-fs";
import path from "bare-path";

import * as utils from "../../@utils";
import * as C from "../../@constants";
import * as log from "../../@log";
import globalState from "../../@globalState";
import { mainMenu } from "..";

/** CREATE.LOCALDRIVE_PATH request handler */
export function req() {
  log.info("Requesting CREATE.LOCALDRIVE_PATH");
  utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.CREATE.LOCALDRIVE_PATH;
  console.log("Enter local drive path (blank for random in default folder):");
}

/** CREATE.LOCALDRIVE_PATH response handler */
export function res(response) {
  log.info("Handling CREATE.LOCALDRIVE_PATH with:", response);
  if (response.length)
    globalState.createNewPearDriveArgs.localDrivePath = response;
  else {
    fs.mkdirSync(path.join(C.LOCALDRIVE_DIR, "default"), { recursive: true });
    globalState.createNewPearDriveArgs.localDrivePath = path.resolve(
      C.LOCALDRIVE_DIR,
      "default"
    );
  }

  utils.pearDrive.create().then(() => {
    mainMenu.req();
  });
}
