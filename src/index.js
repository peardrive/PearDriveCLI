#!/usr/bin/env node
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
import fs from "fs";
import process from "process";

import io from "./@io/index.js";
import * as log from "./@log/index.js";
import * as utils from "./@utils/index.js";
import * as handlers from "./@handlers/index.js";
import G from "./@globalState/index.js";

////////////////////////////////////////////////////////////////////////////////
//  Setup methods
////////////////////////////////////////////////////////////////////////////////

/** Initialize PearDrive CLI */
async function initialize() {
  io.mainDivider();
  io.doubleSlashBorder("🚧 Initializing PearDrive CLI 🚧");
  io.divider();
  io.slashBorder();

  // Determine if first time setup
  const appDir = utils.resolveAppHome();
  const firstTimeSetup = !fs.existsSync(appDir);
  if (firstTimeSetup) {
    io.slashBorder(
      "First time setup detected, creating app directory at",
      appDir
    );
    io.slashBorder();
  }

  G.appDir = appDir;

  if (firstTimeSetup) {
    io.slashBorder("First time setup process completed.");
    io.slashBorder();
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
    if (G.pearDrives.length) {
      for (const drive of G.pearDrives) {
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
    if (G.pearDrives.length) {
      for (const drive of G.pearDrives) {
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
export async function main() {
  try {
    await initialize();
    await io.ready();
    log.info("PearDrive CLI initialized");
    handlers.mainMenu.req(false);
  } catch (error) {
    console.error("Error in main", error);
    log.error("Error in main", error);
    utils.exit();
  }
}

await main();
