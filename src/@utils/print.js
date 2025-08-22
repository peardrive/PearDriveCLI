/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

import * as log from "../@log";

import { chunkString } from "./chunkString";

/** skip a line */
export function newLine() {
  console.log("\n");
}

/** Divider '//-- ... --// */
export function divider() {
  console.log("//" + "-".repeat(76) + "//");
}

/** Divider of '//== ... ==// */
export function doubleSlashEqualsDivider() {
  console.log("//" + "=".repeat(76) + "//");
}

/** Divider of '=' */
export function equalsDivider() {
  console.log("=".repeat(80));
}

/** Single slash side border to text */
export function slashBorder(...text) {
  const formattedText = text.join(" ");
  const lines = chunkString(formattedText, 74);

  if (lines.length === 0) {
    console.log("/" + " ".repeat(78) + "/");
    return;
  }

  for (const line of lines) {
    console.log("/  " + line + " ".repeat(74 - line.length) + "  /");
  }
}

/** Double slash side border to text */
export function doubleSlashBorder(text) {
  if (!text) {
    console.log("//" + " ".repeat(76) + "//");
    return;
  }

  // Single line text
  else if (text.length <= 74) {
    console.log("// " + text + " ".repeat(74 - text.length) + " //");
  }

  // If text is too long, paginate and print multiple lines
  else {
    const lines = text.match(/.{1,74}/g) || [];
    lines.forEach((line) => {
      console.log("// " + line + " ".repeat(74 - line.length) + " //");
    });
  }
}

/** Standard print */
export function ln(...args) {
  console.log(...args);
}

/** Clear the terminal */
export function clear() {
  console.log("\x1B[2J\x1B[0f");
}

/** Full slash divider */
export function fullSlashDivider() {
  console.log("/".repeat(80));
}

/**
 * Print a given saveData object of a PearDrive
 *
 * @param {Object} saveData - The saveData object to print
 * @param {boolean} connected - Whether the PearDrive is connected
 * @param {boolean} [logging=false] - Whether to log the saveData object
 */
export function pearDriveSaveData(saveData, connected, logging = false) {
  slashBorder(`Connection: ${connected ? "🟢 Connected" : "🔴 Disconnected"}`);
  slashBorder("Network Key:");
  slashBorder(`    ${saveData.networkKey}`);
  slashBorder("Watch Path:");
  slashBorder(`    ${saveData.watchPath}`);
  slashBorder("Peer Seed:");
  slashBorder(`    ${saveData.swarmOpts.seed || "Not set"}`);
  slashBorder(
    `Relay Mode: ${saveData.indexOpts.relay ? "🟢 Enabled" : "🔴 Disabled"}`
  );

  if (logging) {
    log.info(`Connection: ${connected ? "🟢 Connected" : "🔴 Disconnected"}`);
    log.info("Network Key:", saveData.networkKey);
    log.info("Watch Path:", saveData.watchPath);
    log.info("Peer Seed:", saveData.seed || "Not set");
    log.info(
      "Relay Mode: " + saveData.indexOpts.relay ? "🟢 Enabled" : "🔴 Disabled"
    );
  }
}
