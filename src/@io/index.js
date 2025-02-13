import readline from "bare-readline";
import tty from "bare-tty";

import * as log from "../@log";
import { cliStateCommands } from "./cliStateCommands";
import { universalCommands } from "./universalCommands";

/** Set up readline i/o for PearDrive CLI */
function configureIO() {
  try {
    /** I/O interface */
    const rl = readline.createInterface({
      input: new tty.ReadStream(0),
      output: new tty.WriteStream(1),
    });

    // Wire up event listener for user input
    rl.on("data", async (res) => {
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

    return rl;
  } catch (error) {
    log.error("Error configuring IO", error);
    console.error("Error configuring IO", error);
    throw new Error(error);
  }
}

export default configureIO;
