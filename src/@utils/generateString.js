import * as log from "../@log";

/**
 *  Generate a random string of specified length
 *
 * @param {number} [length = 8] - length of string to generate
 *
 * @returns {string} - Randomly generated string
 */
export function generateString(length = 8) {
  log.info("Generating random string of length", length);

  try {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  } catch (error) {
    log.error("Error generating random string", error);
    console.error("Error generating random string", error);
    throw new Error(error);
  }
}
