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
