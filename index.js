/** @typedef {import('pear-interface')} */ /* global Pear */
import readline from "bare-readline";
import tty from "bare-tty";
import path from "bare-path";
import fs from "bare-fs";
import process from "bare-process";
import PearDrive from "peardrive-core-alpha";

const rl = readline.createInterface({
  input: new tty.ReadStream(0),
  output: new tty.WriteStream(1),
});

/** PearDrive instance */
let pearDrive;

/** Root path directory */
export const curPath = path.resolve(".");
/** Base data directory */
export const DATA_DIR = path.join(curPath, "data");
/** Local filesystem directory */
export const LOCALDRIVE_DIR = path.join(DATA_DIR, "local");
/** Corestore data directory */
export const CORESTORE_DIR = path.join(DATA_DIR, "store");
/** Save data directory */
export const SAVE_DIR = path.join(DATA_DIR, "save");
/** Save file path */
export const SAVE_FILE = path.join(SAVE_DIR, "save.json");

async function initialize() {
  // Ensure folders exist
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(CORESTORE_DIR)) fs.mkdirSync(CORESTORE_DIR);
  if (!fs.existsSync(LOCALDRIVE_DIR)) fs.mkdirSync(LOCALDRIVE_DIR);
  if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR);
}

async function createPearDrive() {
  //
}

async function main() {
  initialize();
  //const path = await askQuestion("Enter the absolute path to the drive: ");
  //const relayMode = await askQuestion("Enter relay mode (blank for false): ");
  //const networkKey = await askQuestion(
  //  "Enter the network key: (leave blank for new)"
  //);

  // PD args
  const args = {
    corestorePath: CORESTORE_DIR,
    localDrivePath: LOCALDRIVE_DIR,
  };

  pearDrive = new PearDrive(args);
  await pearDrive.ready();
  await pearDrive.joinNetwork();
  console.log(
    "pearDrive running on network",
    pearDrive.getSaveData().networkKey
  );
}

main();
