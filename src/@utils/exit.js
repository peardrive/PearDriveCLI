import process from "bare-process";

import * as log from "../@log";

/** End the process */
export function exit() {
  log.info("Exiting process");
  process.exit(0);
}
