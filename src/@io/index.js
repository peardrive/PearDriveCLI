/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import readline from "readline";
import tty from "bare-tty";

import * as log from "../@log";
import { cliStateCommands } from "./cliStateCommands";
import { universalCommands } from "./universalCommands";

class IO {
  /** ReadLine interface */
  #rl = null;

  //-- Input methods --//

  /** Prompt line for user input */
  prompt() {
    this.#rl.prompt();
  }

  //-- Output methods --//

  /** Print a blank newline */
  newLine() {
    console.log("\n");
  }

  /** Divider line */
  divider() {
    console.log("//" + "-".repeat(76) + "//");
  }

  /** Header/Footer divider */
  mainDivider() {
    console.log("//" + "=".repeat(76) + "//");
  }

  /** Pure equals divider */
  equalsDivider() {
    console.log("=".repeat(80));
  }

  /** Print text with single slash border */
  slashBorder(...text) {
    if (!text) text = "";
    const formattedText = text.join(" ");
    const lines = this.#chunkString(formattedText);

    for (const line of lines) {
      console.log("/  " + line + " ".repeat(74 - line.length) + "  /");
    }
  }

  /** Print text with a double slash border */
  doubleSlashBorder(...text) {
    if (!text) text = "";
    const formattedText = text.join(" ");
    const lines = this.#chunkString(formattedText);

    for (const line of lines) {
      console.log("// " + line + " ".repeat(74 - line.length) + " //");
    }
  }

  /** Print out a PearDrive saveData object */
  pearDriveSaveData(saveData, connected = false, detailed = false) {
    if (!saveData) {
      this.slashBorder("No save data available");
      return;
    }

    this.slashBorder(
      `Connection: ${connected ? "🟢 Connected" : "🔴 Disconnected"}`
    );
    this.slashBorder("Network Key:");
    this.slashBorder(`    ${saveData.networkKey}`);
    this.slashBorder("Watch Path:");
    this.slashBorder(`    ${saveData.watchPath}`);
    this.slashBorder("Peer Seed:");
    this.slashBorder(`    ${saveData.swarmOpts.seed || "Not set"}`);
    this.slashBorder(
      `Relay Mode: ${saveData.indexOpts.relay ? "🟢 Enabled" : "🔴 Disabled"}`
    );

    if (detailed) {
      this.divider();
      this.slashBorder("Swarm Options:");
      Object.entries(saveData.swarmOpts || {}).forEach(([key, value]) => {
        this.slashBorder(`  ${key}: ${value}`);
      });

      this.divider();
      this.slashBorder("Log Options:");
      Object.entries(saveData.logOpts || {}).forEach(([key, value]) => {
        this.slashBorder(`  ${key}: ${value}`);
      });

      this.divider();
      this.slashBorder("Index Options:");
      Object.entries(saveData.indexOpts || {}).forEach(([key, value]) => {
        this.slashBorder(`  ${key}: ${value}`);
      });
    }
  }

  /** Clear console (scrolls previous out of view) */
  clear() {
    console.log("\x1B[2J\x1B[0f");
  }

  //-- Lifecycle methods --//

  /** Set up ReadLine interface */
  configure() {
    /** Readline Interface */
    this.#rl = readline.createInterface({
      input: new tty.ReadStream(0),
      output: new tty.WriteStream(1),
      prompt: "\nPearDrive CLI> ",
    });

    // Wire up event listener for user input
    this.#rl.on("data", async (res) => {
      log.info("Received user i/o input:", res);

      try {
        // Process universal command first
        const universalCommand = universalCommands(res);
        if (universalCommand) return;

        // Process cli-state specific command
        const cliStateCommand = cliStateCommands(res);
        if (cliStateCommand) return;

        // Invalid command
        log.warn("Invalid command");
        console.warn("Invalid command");
      } catch (error) {
        log.error("Error processing user input", error);
        console.error("Error processing user input", error);
      }
    });
  }

  /** Close ReadLine interface */
  close() {
    this.#rl.close();
  }

  /** Break a string into chunks fitting into an output card */
  #chunkString(str, chunkSize = 74) {
    if (!str) return [""]; // Return empty array if str is empty or undefined

    const chunks = [];
    for (let i = 0; i < str.length; i += chunkSize) {
      chunks.push(str.slice(i, i + chunkSize));
    }
    return chunks;
  }
}

export default new IO();
