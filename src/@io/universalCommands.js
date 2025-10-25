/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import * as handlers from "../@handlers/index.js";
import * as C from "../@constants/index.js";
import * as utils from "../@utils/index.js";

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
    case C.UNIVERSAL_COMMANDS.EXIT:
      utils.exit();
      return true;

    case C.UNIVERSAL_COMMANDS.MENU:
      handlers.mainMenu.req();
      return true;

    case C.UNIVERSAL_COMMANDS.CLEAR:
      utils.clearTerminal();
      return true;

    default:
      return false;
  }
}
