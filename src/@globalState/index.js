/* eslint-disable-next-line no-unused-vars */
import PearDrive from "peardrive-core-alpha";

import * as C from "../@constants";
import * as log from "../@log";

/** Global state singleton */
class GlobalState {
  /** Internal value for state of CLI */
  #currentState;
  /** Index of a selected PearDrive (in pearDrives array) */
  #selectedPearDrive;

  constructor() {
    this.#currentState = C.CLI_STATE.INITIALIZING;
    /** List of running PearDrive instances */
    this.pearDrives = [];
    /** Argument object for creating a new PearDrive */
    this.createNewPearDriveArgs = {};
    /** Currently selected PearDrive (determined by key string) */
    this.#selectedPearDrive = null;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Getters / Setters
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Current CLI state (Must be a **CLI_STATE**)
   *
   * @type {string}
   */
  get currentState() {
    return this.#currentState;
  }

  set currentState(newState) {
    if (this.#isValidState(newState)) {
      log.info(`CLI state changed to: ${newState} in globalState`);
      this.#currentState = newState;
    } else {
      log.error(`Invalid CLI state: ${newState}`);
    }
  }

  /**
   * Index of currently selected PearDrive (in pearDrives array)
   *
   * @type {number | null}
   */
  get selectedPearDrive() {
    return this.#selectedPearDrive;
  }

  set selectedPearDrive(pearDriveIndex) {
    // Deselect PearDrive
    if (pearDriveIndex === null || undefined) {
      log.info("Deselected PearDrive in globalState");
      this.#selectedPearDrive = null;
      return;
    }

    // Validate input
    if (pearDriveIndex < 0 || pearDriveIndex >= this.pearDrives.length) {
      log.error(
        `Invalid selectedPearDriveIndex ${pearDriveIndex} in globalState`
      );
      this.#selectedPearDrive = null;
      return;
    }

    log.info(
      "Selected PearDrive in globalState: ",
      this.pearDrives[pearDriveIndex].networkKey,
      "at index",
      pearDriveIndex
    );
    this.#selectedPearDrive = pearDriveIndex;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Add a PearDrive instance to the pearDrives array
   *
   * @param {PearDrive} pearDrive - PearDrive instance to add
   */
  addPearDrive(pearDrive) {
    log.info("Adding pearDrive", pearDrive.networkKey, "to pearDrives array");
    this.pearDrives.push(pearDrive);
  }

  /**
   * Remove a PearDrive instance with given network key from the pearDrives
   * array
   *
   * @param {string} networkKey - Network key of PearDrive to remove
   */
  async removePearDrive(networkKey) {
    log.info("Removing PearDrive with network key", networkKey);

    try {
      // Graceful teardown
      const pearDrive = this.getPearDrive(networkKey);
      await pearDrive.close();

      // Remove from state
      this.pearDrives = this.pearDrives.filter(
        (pearDrive) => pearDrive.networkKey !== networkKey
      );
    } catch (error) {
      log.error("Error removing PearDrive", error);
    }
  }

  /**
   * Retrieve a PearDrive instance based on given network key
   *
   * @param {string} networkKey
   *
   * @returns {PearDrive} - PearDrive instance with given network key
   */
  getPearDrive(networkKey) {
    log.info("Retrieving PearDrive with network key", networkKey);
    return this.pearDrives.find(
      (pearDrive) => pearDrive.networkKey === networkKey
    );
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private functions
  //////////////////////////////////////////////////////////////////////////////

  /**V
   * Check if a given string is a valid state *
   *
   * @param {string} state - State to check
   * @param {Object} obj - Object to check against, key is state name,
   * value is state value. This should only be for CLI_STATE
   *
   * @returns {boolean} - True if state is valid, false otherwise
   */
  #isValidState = (/*state, obj*/) => {
    // TODO fix this
    return true;
    /* if (!obj) obj = C.CLI_STATE;

    for (const key in obj) {
      if (obj[key] === state) {
        return true;
      } else if (
        typeof obj[key] === "object" &&
        this.#isValidState(state, obj[key])
      ) {
        console.log("Checking for valid state in", key);
        return true;
      }
      return false;
    } */
  };
}

// Export singleton
/** Global state singleton */
const state = new GlobalState();
export default state;
