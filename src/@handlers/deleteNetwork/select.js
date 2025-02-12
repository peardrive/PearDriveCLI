import * as utils from "../../@utils";
import globalState from "../../@globalState";
import * as log from "../../@log";
import { mainMenu } from "..";

/** DELETE_NETWORK.SELECT request handler*/
export function req() {
  log.info("Requesting DELETE_NETWORK.SELECT");
  utils.clearTerminal();
  // Get peardrive data
  const pearDriveData = globalState.pearDrives.map((drive) => {
    const saveData = drive.getSaveData();
    const pdData = {
      key: saveData.networkKey,
      nickname: saveData.networkNickname.name,
    };
    return pdData;
  });

  console.log("Data", pearDriveData);
}

/** DELETE_NETWORK.SELECT response handler */
export function res(res) {
  const networkKey = res;
  log.info("Deleting PearDrive network data for network:", networkKey);
  mainMenu.req();
}
