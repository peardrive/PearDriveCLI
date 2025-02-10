import process from "bare-process";

import globalState from "../../@globalState";
import * as C from "../../@constants";
import * as utils from "../../@utils";
import * as handlers from "..";

/** MAIN_MENU request handler */
export function req() {
  utils.clearTerminal();
  globalState.currentState = C.CLI_STATE.MAIN;
  console.log("Welcome to PearDrive CLI");
  console.log("Enter 'quit' at any time to end the process");
  console.log("1. 'create' Create new PearDrive");
  console.log("2. 'join' Join existing PearDrive network");
  console.log("3. 'list' List all saved PearDrive networks");
  console.log("4. 'delete' Delete a saved PearDrive network");
  console.log("0. 'exit' Exit");
}

/** MAIN_MENU response handler */
export function res(response) {
  switch (response) {
    // Create new PearDrive
    case "1":
    case "create":
      handlers.create.relayMode.req();
      break;

    // Join existing PearDrive network
    case "2":
    case "join":
      handlers.joinExisting.networkKey.req();
      break;

    // List all PearDrive networks
    case "3":
    case "list":
      handlers.listNetwork.all.req();
      break;

    // Delete a PearDrive network
    case "4":
    case "delete":
      handlers.deleteNetwork.select.req();
      break;

    // Stop program
    case "0":
    case "exit":
      process.kill(process.pid, "SIGINT");
      break;

    default:
      console.log("Invalid input, please try again");
      break;
  }
}
