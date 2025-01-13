import path from "bare-path";

/** Root path directory */
export const CUR_PATH = path.resolve(".");

/** Base data directory */
export const DATA_DIR = path.join(CUR_PATH, "data");

/** Local filesystem directory */
export const LOCALDRIVE_DIR = path.join(DATA_DIR, "local");

/** Corestore data directory */
export const CORESTORE_DIR = path.join(DATA_DIR, "store");

/** Save data directory */
export const SAVE_DIR = path.join(DATA_DIR, "save");

/** Save file path */
export const SAVE_FILE = path.join(SAVE_DIR, "save.json");

/** Logs path */
export const LOG_DIR = path.join(DATA_DIR, "logs");

/** Log file path */
export const LOG_FILE = path.join(LOG_DIR, "log.txt");

/** Different states of the CLI, what is the next input for */
export const CLI_STATE = {
  MAIN: "MAIN",
  CREATE: {
    RELAY_MODE: "RELAY_MODE",
    LOCALDRIVE_PATH: "LOCALDRIVE_PATH",
  },
  JOIN_EXISTING: {
    NETWORK_KEY: "NETWORK_KEY",
    SEED: "SEED",
    LOCALDRIVE_PATH: "LOCALDRIVE_PATH",
  },
  LIST_NETWORK: {
    ALL: "ALL",
    NETWORK: "NETWORK",
  },
};
