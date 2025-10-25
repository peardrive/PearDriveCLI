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
import tty from "tty";
import ReadyResource from "ready-resource";
import process from "process";

import * as log from "../@log/index.js";
import * as utils from "../@utils/index.js";
import { cliStateCommands } from "./cliStateCommands.js";
import { universalCommands } from "./universalCommands.js";

class IO extends ReadyResource {
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

  /**
   * Print out a PearDrive saveData object
   *
   * @param {Object} saveData - The saveData object to print
   * @param {boolean} connected - Whether the PearDrive is connected
   * @param {string} [publicKey] - The peer key of the PearDrive
   * @param {boolean} [detailed=false] - Whether to print detailed options
   */
  pearDriveSaveData(saveData, connected = false, publicKey, detailed = false) {
    if (!saveData) {
      this.slashBorder("No save data available");
      return;
    }

    this.slashBorder(
      `Connection: ${connected ? "🟢 Connected" : "🔴 Disconnected"}`
    );
    publicKey && this.slashBorder("Peer Public Key:");
    publicKey && this.slashBorder(`    ${publicKey}`);
    this.slashBorder("Network Key:");
    this.slashBorder(`    ${saveData.networkKey}`);
    this.slashBorder("Watch Path:");
    this.slashBorder(`    ${saveData.watchPath}`);
    this.slashBorder("Peer Seed:");
    this.slashBorder(`    ${saveData.swarmOpts.seed || "Not set"}`);
    this.slashBorder(
      `Relay Mode: ${saveData.indexOpts.relay ? "🟢 Enabled" : "⚫ Disabled"}`
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

  //////////////////////////////////////////////////////////////////////////////
  //  Private methods
  //////////////////////////////////////////////////////////////////////////////

  /** Break a string into chunks fitting into an output card */
  #chunkString(str, chunkSize = 74) {
    if (!str) return [""]; // Return empty array if str is empty or undefined

    const chunks = [];
    for (let i = 0; i < str.length; i += chunkSize) {
      chunks.push(str.slice(i, i + chunkSize));
    }
    return chunks;
  }

  #wireEvents() {
    // Figure out proper event hook for Pear vs. Node
    let dataEvent;
    if (utils.isPearRuntime()) dataEvent = "data";
    else dataEvent = "line";

    // fire once per line user submits
    this.#rl.on(dataEvent, async (line) => {
      const res = line.trim();
      log.info("Received user input:", res);

      try {
        // universal commands
        const handledUniversal = universalCommands(res);
        if (handledUniversal) return this.#rl.prompt();

        // state-specific commands
        const handledState = cliStateCommands(res);
        if (handledState) return this.#rl.prompt();

        // invalid command
        log.warn("Invalid command:", res);
        console.warn("Invalid command");
      } catch (err) {
        log.error("Error processing user input", err);
        console.error("Error processing user input:", err?.message || err);
      } finally {
        this.#rl.prompt(); // keep the REPL alive
      }
    });

    // nice Ctrl+C behavior
    this.#rl.on("SIGINT", () => {
      console.log("\n(press Ctrl+C again to exit)");
      this.#rl.prompt();
    });

    this.#rl.on("close", () => {
      console.log("\nGoodbye!");
      process.exit(0);
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Lifecycle methods
  //////////////////////////////////////////////////////////////////////////////

  /** Ready */
  async _open() {
    // Construct ReadLine interface for cross compatibility with Pear and Node
    let input;
    let output;
    let terminal;
    let crlfDelay;
    if (utils.isPearRuntime()) {
      input = new tty.ReadStream(0);
      output = new tty.WriteStream(1);
      terminal = true;
      crlfDelay = Infinity;
    } else {
      input = process.stdin;
      output = process.stdout;
      terminal = process.stdout.isTTY;
      crlfDelay = Infinity;
    }
    this.#rl = readline.createInterface({
      input,
      output,
      terminal,
      crlfDelay,
    });

    this.#rl.setPrompt("\nPearDrive CLI> ");
    this.#wireEvents();
  }

  /** Close */
  async _close() {
    this.#rl.close();
  }
}

export default new IO();
