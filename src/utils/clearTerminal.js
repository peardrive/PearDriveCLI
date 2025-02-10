import readline from "bare-readline";
import tty from "bare-tty";
import fs from "bare-fs";
import process from "bare-process";

/** Clear terminal text */
export function clearTerminal() {
  console.log("\x1B[2J\x1B[0f");
}
