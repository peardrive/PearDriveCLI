import * as handlers from "../@handlers";
import * as C from "../@constants";
import * as utils from "../@utils";

/**
 * Handle the universal commands for a given input
 *
 * @param {string} input - Input to handle\
 *
 * @returns {boolean} - True if input is a universal command, false otherwise
 */
export function universalCommands(input) {
  switch (input) {
    case C.UNIVERSAL_COMMANDS.QUIT:
      utils.exit();
      return true;

    case C.UNIVERSAL_COMMANDS.MENU:
      handlers.mainMenu.req();
      return true;

    default:
      return false;
  }
}
