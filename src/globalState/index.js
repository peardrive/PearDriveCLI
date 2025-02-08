import * as C from "../constants";
import * as log from "../log";

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
    if (Object.values(C.CLI_STATE).includes(newState)) {
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
}

// Export singleton
/** Global state singleton */
const state = new GlobalState();
export default state;
