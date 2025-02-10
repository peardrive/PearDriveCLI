import utils from "../../utils";
import globalState from "../../globalState";
import { mainMenu } from "..";

/** DELETE_NETWORK.SELECT request handler*/
export function req() {
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
  mainMenu.req();
}
