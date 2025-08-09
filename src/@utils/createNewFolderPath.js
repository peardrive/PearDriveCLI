/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import path from "bare-path";

import * as utils from ".";
import * as log from "../@log";

/**
 * Create a new folder path of given length
 *
 * @param {string} basePath - Base path to create new folder path from
 *
 * @param {number} [length = 8] - Length of new folder path
 *
 * @returns {string} - New folder path
 */
export function createNewFolderPath(basePath, length = 8) {
  try {
    return path.resolve(basePath, utils.generateString(length));
  } catch (error) {
    log.error("Error creating new folder path", error);
    console.error("Error creating new folder path", error);
    throw new Error(error);
  }
}
