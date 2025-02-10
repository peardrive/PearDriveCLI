import * as C from "../@constants";
import * as log from "../@log";

/** Global state singleton */
class GlobalState {
  /** Internal value for state of CLI */
  #currentState;

  constructor() {
    this.#currentState = C.CLI_STATE.INITIALIZING;
    /** List of running PearDrive instances */
    this.pearDrives = [];
    /** Argument object for creating a new PearDrive */
    this.createNewPearDriveArgs = {};
    /** Currently selected PearDrive (determined by key string) */
    this.selectedPearDrive = null;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Getters / Setters
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Current CLI state (Must be a **CLI_STATE**)
   * @type {string}
   */
  get currentState() {
    return this.#currentState;
  }

  set currentState(newState) {
    if (this.#isValidState(newState)) {
      this.#currentState = newState;
    } else {
      log.error(`Invalid CLI state: ${newState}`);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Private functions
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Check if a given string is a valid state *
   *
   * @param {string} state - State to check
   * @param {Object} obj - Object to check against, key is state name,
   * value is state value. This should only be for CLI_STATE
   *
   * @returns {boolean} - True if state is valid, false otherwise
   */
  #isValidState = (state, obj) => {
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
