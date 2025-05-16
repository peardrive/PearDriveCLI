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

/** Core logs path */
export const CORE_LOG_DIR = path.join(LOG_DIR, "core");

/** Log file path */
export const LOG_FILE = path.join(LOG_DIR, "log.log");

/** Different states of the CLI, what is the next input for */
export const CLI_STATE = {
  INITIALIZING: "INITIALIZING",
  MAIN: "MAIN",
  CREATE: {
    RELAY_MODE: "CREATE.RELAY_MODE",
    LOCALDRIVE_PATH: "CREATE.LOCALDRIVE_PATH",
  },
  JOIN_EXISTING: {
    NETWORK_KEY: "JOIN_EXISTING.NETWORK_KEY",
    SEED: "JOIN_EXISTING.SEED",
    LOCALDRIVE_PATH: "JOIN_EXISTING.LOCALDRIVE_PATH",
  },
  LIST_NETWORK: {
    ALL: "LIST_NETWORK.ALL",
    SELECTED: "LIST_NETWORK.SELECTED",
  },
  DELETE_NETWORK: {
    SELECT: "DELETE_NETWORK.SELECT",
  },
  NETWORK_MENU: {
    QR: "NETWORK_MENU.QR",
    NICKNAME: "NETWORK_MENU.NICKNAME",
  },
};

/** Universal commands */
export const UNIVERSAL_COMMANDS = {
  QUIT: "quit",
  EXIT: "exit",
  MENU: "menu",
};
