import readline from "bare-readline";
import tty from "bare-tty";
import fs from "bare-fs";
import process from "bare-process";
import path from "bare-path";
import PearDrive from "peardrive-core-alpha";

import globalState from "../globalState";
import * as log from "../log";

/** Load existing PearDrive instance from args */
export async function loadPearDrive(saveData) {
  log.info("Loading PearDrive instance from save data", saveData.networkKey);

  try {
    const drive = new PearDrive(saveData);
    await drive.ready();
    await drive.joinNetwork(saveData.networkKey);

    globalState.pearDrives.push(drive);
  } catch (error) {
    log.error("Error loading PearDrive instance", error);
    console.error("Error loading PearDrive instance", error);
  }
}
