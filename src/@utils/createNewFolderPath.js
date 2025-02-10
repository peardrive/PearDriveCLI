import path from "bare-path";

import * as utils from ".";

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
  return path.join(basePath, utils.generateString(length));
}
