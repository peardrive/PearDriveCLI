import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import { mainMenu } from "..";
import * as handlers from "..";

/** NETWORK_MENU.NETWORK request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export async function req(clear = true) {
  log.info("Requesting NETWORK_MENU.NETWORK");
  clear && utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.NETWORK;

  const pearDrive = globalState.getSelectedPearDrive();
  if (!pearDrive) {
    console.log("No PearDrive selected");
    handlers.mainMenu.req(false);
    return;
  }

  try {
    const nonlocalFiles = await pearDrive.listNonLocalFiles();
    globalState.nonlocalFiles = nonlocalFiles;
    console.log("Non-local PearDrive files:");
    nonlocalFiles.length === 0
      ? console.log("No non-local PearDrive files found.")
      : nonlocalFiles.forEach((file, index) => {
          console.log(`${index}. ${file}`);
        });
    console.log("=== Enter the number of the file to download ===");
    console.log("=== Or type 'back' to return to the main menu ===");
  } catch (error) {
    console.error("Error listing non-local files:", error);
    log.error("Error listing non-local files in NETWORK_MENU.NETWORK", error);
    handlers.mainMenu.req(false);
    return;
  }
}

/** NETWORK_MENU.NETWORK response handler
 *
 * @param {string} response
 */
export async function res(response) {
  log.info("Handling NETWORK_MENU.NETWORK with:", response);

  if (response.toLowerCase() === "back") {
    console.log("Returning to network menu...");
    log.info("Returning to LIST_NETWORK.SELECTED in NETWORK_MENU.NETWORK");
    handlers.listNetwork.selected.req();
    return;
  }

  // Validate response
  if (
    !response ||
    isNaN(response) ||
    parseInt(response) < 0 ||
    parseInt(response) >= globalState.nonlocalFiles.length
  ) {
    console.log("Invalid input. Please enter a valid file number.");
    log.error("Invalid input in NETWORK_MENU.NETWORK response");
    req(false);
    return;
  }

  const resIndex = parseInt(response);
  const selectedFile = globalState.nonlocalFiles[resIndex];
  console.log(`Selected file: ${selectedFile} Downloading...`);
  try {
    const pearDrive = globalState.getSelectedPearDrive();
    await pearDrive.downloadFile(selectedFile);
    console.log(`File ${selectedFile} downloaded successfully.`);
    log.info(
      `File ${selectedFile} downloaded successfully in NETWORK_MENU.NETWORK`
    );
  } catch (error) {
    console.error("Error downloading file:", error);
    log.error("Error downloading file in NETWORK_MENU.NETWORK", error);
    handlers.mainMenu.req(false);
    return;
  }
}
