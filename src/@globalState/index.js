/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/* eslint-disable-next-line no-unused-vars */
import PearDrive from "@hopets/pear-core";

import * as C from "../@constants";
import * as log from "../@log";

/** Global state */
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
    /** Temp storage for nonlocal files of a PearDrive instance */
    this.nonlocalFiles = [];
    /** Temp storage for local files of a PearDrive instance */
    this.localFiles = [];
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
    if (
      isNaN(parseInt(pearDriveIndex)) ||
      pearDriveIndex < 0 ||
      pearDriveIndex >= this.pearDrives.length
    ) {
      log.error(
        `Invalid selectedPearDriveIndex ${pearDriveIndex} in globalState`
      );
      this.#selectedPearDrive = null;
      return;
    }

    const index = parseInt(pearDriveIndex);
    log.info(
      "Selected PearDrive in globalState: ",
      this.pearDrives[index].networkKey,
      "at index",
      index
    );
    this.#selectedPearDrive = index;
    log.info(
      "Selected PearDrive index in globalState:",
      this.#selectedPearDrive
    );
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////

  /** Add a PearDrive instance to the pearDrives array
   *
   * @param {PearDrive} pearDrive - PearDrive instance to add
   *
   * @returns {number} - Index of the added PearDrive in pearDrives array
   */
  addPearDrive(pearDrive) {
    log.info("Adding pearDrive", pearDrive.networkKey, "to pearDrives array");
    this.pearDrives.push(pearDrive);
    return this.pearDrives.length - 1;
  }

  /** Remove a PearDrive instance with given network key from the pearDrives
   * array
   *
   * @param {number} index - Index of PearDrive to remove
   */
  removePearDrive(index) {
    log.info("Removing PearDrive at index", index);

    try {
      // Validate index
      if (
        isNaN(parseInt(index)) ||
        index < 0 ||
        index >= this.pearDrives.length
      ) {
        log.error("Invalid PearDrive index", index);
        return;
      }

      // Remove from state
      this.pearDrives.splice(index, 1);
      log.debug("Removed PearDrive, new pearDrives array:", this.pearDrives);
    } catch (error) {
      log.error("Error removing PearDrive", error);
    }
  }

  /** Retrieve a PearDrive instance based on given network key
   *
   * @param {number} networkKey - Network key of the PearDrive to retrieve.
   *
   * @returns {number} - Index of the PearDrive in pearDrives array, or -1 if
   * not found
   */
  getPearDrive(key) {
    log.info("Retrieving PearDrive with key", key);
    if (key === null || key === undefined) {
      log.error("No key provided");
      return null;
    }

    for (let i = 0; i < this.pearDrives.length; i++) {
      const pearDrive = this.pearDrives[i];
      log.debug("Checking PearDrive", pearDrive.networkKey);
      const tmpNetworkKey = pearDrive.networkKey;
      if (String(tmpNetworkKey) === String(key)) {
        log.debug("Found PearDrive", pearDrive);
        return i;
      }
    }

    log.warn("No PearDrive found with network key", networkKey);
    return -1; // Not found
  }

  /** Get the currently selected PearDrive instance
   *
   * @returns {PearDrive} - PearDrive instance with given network key
   */
  getSelectedPearDrive() {
    log.info("Retrieving selected PearDrive");

    try {
      if (this.selectedPearDrive === null)
        throw new Error("No PearDrive selected");

      return this.pearDrives[this.selectedPearDrive];
    } catch (error) {
      log.error("Error retrieving selected PearDrive", error);
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private functions
  //////////////////////////////////////////////////////////////////////////////

  /** Check if a given string is a valid state *
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
