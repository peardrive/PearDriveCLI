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
import PearDrive from "@peardrive/core";
import path from "path";

import * as C from "../@constants/index.js";
import * as log from "../@log/index.js";
import * as utils from "../@utils/index.js";

/** Global state */
class GlobalState {
  /** Internal value for state of CLI */
  #currentState;
  /** Index of a selected PearDrive (in pearDrives array) */
  #selectedPearDrive;
  /** Root directory of app data */
  #appDir;

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
    /** CLI data folder */
    this.#appDir = "";
  }

  //////////////////////////////////////////////////////////////////////////////
  // Getters / Setters
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Base directory path for PearDrive CLI data
   *
   * @type {string}
   */
  get appDir() {
    return this.#appDir;
  }

  set appDir(dirPath) {
    this.#appDir = dirPath;

    // Create directory structure if it doesn't exist
    utils.ensureDirSecure(this.appDir);
    utils.ensureDirSecure(this.logsDir);
    utils.ensureDirSecure(this.saveDir);
    utils.ensureDirSecure(this.storeDir);
    utils.ensureDirSecure(this.coreLogsDir);
    utils.ensureDirSecure(this.watchDir);
  }

  /**
   * Directory path for logs
   *
   * @type {string}
   */
  get logsDir() {
    return path.join(this.appDir, "logs");
  }

  /**
   * Directory path for core logs
   *
   * @type {string}
   */
  get coreLogsDir() {
    return path.join(this.logsDir, "core");
  }

  /**
   * Get log file path
   *
   * @type {string}
   */
  get logFilePath() {
    return path.join(this.logsDir, "cli.log");
  }

  /**
   * Directory for default watch paths
   *
   * @type {string}
   */
  get watchDir() {
    return path.join(this.appDir, "watch");
  }

  /**
   * Directory path for saves
   *
   * @type {string}
   */
  get saveDir() {
    return path.join(this.appDir, "save");
  }

  /**
   * File path for save data file
   */
  get saveFilePath() {
    return path.join(this.saveDir, "save.json");
  }

  /**
   * Directory path for stores
   *
   * @type {string}
   */
  get storeDir() {
    return path.join(this.appDir, "store");
  }

  /**
   * Current CLI state (Must be a **CLI_STATE**)
   *
   * @type {string}
   */
  get currentState() {
    return this.#currentState;
  }

  set currentState(newState) {
    log.info(`CLI state changed to: ${newState} in globalState`);
    this.#currentState = newState;
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

  /**
   * Add a PearDrive instance to the pearDrives array
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

  /**
   * Remove a PearDrive instance with given network key from the pearDrives
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
      throw new Error(
        `Error removing PearDrive at index ${index}: ${error.message}`
      );
    }
  }

  /**
   * Retrieve a PearDrive instance based on given network key
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

  /**
   * Get the currently selected PearDrive instance
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

  /**
   * Get the index of a pearDrive from a given seed
   *
   * @param {string} seed - The seed of the PearDrive to find
   *
   * @return {number} - Index of the PearDrive in pearDrives array, or -1 if not
   *  found
   */
  getPearDriveIndexFromSeed(seed) {
    log.info("Retrieving PearDrive index from seed", seed);

    if (!seed) {
      log.error("No seed provided");
      return -1;
    }

    for (let i = 0; i < this.pearDrives.length; i++) {
      const pearDrive = this.pearDrives[i];
      if (pearDrive.seed === seed) {
        log.debug("Found PearDrive at index", i);
        return i;
      }
    }

    log.warn("No PearDrive found with seed", seed);
    return -1;
  }
}

// Export singleton
/** Global state singleton */
const state = new GlobalState();
export default state;
