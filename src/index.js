// /** @typedef {import('pear-interface')} */ /* global Pear */
import * as utils from "./@utils";
import * as handlers from "./@handlers";

/** Entry point function */
async function main() {
  await utils.initialize();
  utils.configureIO();
  handlers.mainMenu.req();
}

main();
