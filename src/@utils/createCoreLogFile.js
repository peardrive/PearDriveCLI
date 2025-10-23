/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import path from "path";

import G from "../@globalState/index.js";
import * as log from "../@log/index.js";
import * as utils from "./index.js";

/** Create log file for an instance of PearDrive core */
export function createCoreLogFile(name = utils.generateString()) {
  log.info("Creating core log file for", name);

  try {
    const filePath = path.join(G.coreLogsDir, `${name}.log`);
    log.debug("Core log file created at", filePath);
    return filePath;
  } catch (error) {
    log.error("Error creating core log file", error);
    console.error("Error creating core log file", error);
    throw new Error(error);
  }
}
