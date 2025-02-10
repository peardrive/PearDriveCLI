import readline from "bare-readline";
import tty from "bare-tty";
import fs from "bare-fs";
import process from "bare-process";
import path from "bare-path";

import globalState from "../globalState";
import * as utils from ".";
import * as log from "../log";

/** Delete a specific PearDrive network save data */
export async function deletePearDrive(networkKey) {
  log.info("Deleting saved PearDrive network data", networkKey);
  const pearDrive = globalState.pearDrives.find(
    (d) => d.networkKey === networkKey
  );
  if (pearDrive) {
    await pearDrive.close();
    globalState.pearDrives = globalState.pearDrives.filter(
      (d) => d !== pearDrive
    );
    // TODO fix ^^^
  }
  utils.removeSave(networkKey);
}
