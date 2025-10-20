/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import * as log from "../../@log/index.js";

/**
 * Print a given saveData object of a PearDrive
 *
 * @param {Object} saveData - The saveData object to print
 * @param {boolean} connected - Whether the PearDrive is connected
 * @param {string} [publicKey] - The peer key of the PearDrive
 */
export function logSaveData(saveData, connected, publicKey) {
  if (!saveData) {
    log.info("No save data found for this PearDrive.");
    return;
  }
  log.info(`Connection: ${connected ? "🟢 Connected" : "🔴 Disconnected"}`);
  log.info("Network Key:", saveData.networkKey);
  log.info("Watch Path:", saveData.watchPath);
  log.info("Peer Seed:", saveData.seed || "Not set");
  if (publicKey) log.info("Peer Key:", publicKey);
  log.info(
    "Relay Mode: " + saveData.indexOpts.relay ? "🟢 Enabled" : "🔴 Disabled"
  );
}
