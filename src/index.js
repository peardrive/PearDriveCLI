/*!
 * Copyright (C) 2025 PearDrive
 * Copyright (C) 2025 Jenna Baudelaire
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

// /** @typedef {import('pear-interface')} */ /* global Pear */
import fs from "bare-fs";
import process from "bare-process";

import io from "./@io";
import * as C from "./@constants";
import * as log from "./@log";
import * as utils from "./@utils";
import * as handlers from "./@handlers";
import globalState from "./@globalState";

////////////////////////////////////////////////////////////////////////////////
//  Setup methods
////////////////////////////////////////////////////////////////////////////////

/** Initialize PearDrive CLI */
async function initialize() {
  io.mainDivider();
  io.doubleSlashBorder("🚧 Initializing PearDrive CLI 🚧");
  io.divider();
  io.slashBorder();
  // Ensure folders exist
  const firstTimeSetup = !fs.existsSync(C.DATA_DIR);
  if (firstTimeSetup) {
    io.slashBorder("First time setup detected");
    io.slashBorder("Creating data directory at", C.DATA_DIR);
    io.slashBorder();
    fs.mkdirSync(C.DATA_DIR);
  }
  if (!fs.existsSync(C.CORESTORE_DIR)) {
    io.slashBorder("Creating corestore directory at", C.CORESTORE_DIR);
    io.slashBorder();
    fs.mkdirSync(C.CORESTORE_DIR);
  }
  if (!fs.existsSync(C.WATCH_DIR)) {
    io.slashBorder("Creating watchPath directory at", C.WATCH_DIR);
    io.slashBorder();
    fs.mkdirSync(C.WATCH_DIR);
  }
  if (!fs.existsSync(C.SAVE_DIR)) {
    io.slashBorder("Creating save directory at", C.SAVE_DIR);
    io.slashBorder();
    fs.mkdirSync(C.SAVE_DIR);
  }
  if (!fs.existsSync(C.LOG_DIR)) {
    io.slashBorder("Creating log directory at", C.LOG_DIR);
    io.slashBorder();
    fs.mkdirSync(C.LOG_DIR);
  }
  if (!fs.existsSync(C.CORE_LOG_DIR)) {
    io.slashBorder("Creating core log directory at", C.CORE_LOG_DIR);
    io.slashBorder();
    fs.mkdirSync(C.CORE_LOG_DIR);
  }
  if (firstTimeSetup) {
    io.slashBorder("First time setup process completed.");
    io.slashBorder();
  }

  // Init logging
  if (fs.existsSync(C.LOG_FILE)) {
    io.slashBorder("Deleting log file at", C.LOG_FILE);
    io.slashBorder();
    fs.unlinkSync(C.LOG_FILE);
  }

  // Load PearDrive networks (if any exist)
  const data = utils.saveData.getAll();
  if (data) {
    log.info("Save data found, loading PearDrive networks");
    for (const network of data) {
      await utils.pearDrive.load(network);
      io.slashBorder("Loaded PearDrive network", network.networkKey);
      io.slashBorder();
      log.info("Loaded PearDrive network", network.networkKey);
    }
  }

  // Add global error handling
  process.on("uncaughtException", async (err) => {
    log.error("Uncaught Exception:", err);
    if (globalState.pearDrives.length) {
      for (const drive of globalState.pearDrives) {
        try {
          await drive.close();
        } catch (closeError) {
          log.error(
            "Error closing PearDrive on uncaught exception",
            closeError
          );
        }
      }
    }
    utils.exit();
  });
  process.on("unhandledRejection", async (reason, promise) => {
    log.error("Unhandled Rejection at:", promise, "reason:", reason);
    if (globalState.pearDrives.length) {
      for (const drive of globalState.pearDrives) {
        try {
          await drive.close();
        } catch (closeError) {
          log.error(
            "Error closing PearDrive on unhandled rejection",
            closeError
          );
        }
      }
    }
    utils.exit();
  });

  io.divider();
  io.doubleSlashBorder("🥑 PearDrive CLI initialized 🥑");
  io.mainDivider();
  io.newLine();
}

////////////////////////////////////////////////////////////////////////////////
//  Main
////////////////////////////////////////////////////////////////////////////////

/** Entry point function */
async function main() {
  try {
    await initialize();
    io.configure();
    log.info("PearDrive CLI initialized");
    handlers.mainMenu.req(false);
  } catch (error) {
    console.error("Error in main", error);
    log.error("Error in main", error);
    utils.exit();
  }
}

main();
