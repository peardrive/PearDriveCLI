import readline from "bare-readline";
import tty from "bare-tty";
import fs from "bare-fs";
import process from "bare-process";
import path from "bare-path";

export * as utils from ".";
import * as log from "../log";

/** Save a new PearDrive network data */
export async function savePearDrive(saveData) {
  log.info("Saving PearDrive network data", saveData.networkKey);
  utils.addSave(saveData);
}
