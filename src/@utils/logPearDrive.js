import * as log from "../@log";

/**
 * Given a PearDrive network saveData object, log the information about the
 * network
 *
 * @param {Object} saveData - PearDrive network saveData object
 * @param {boolean} saveData.connected - Whether the network is connected
 * @param {boolean} [log=false] - Whether to log the information
 */
export function logPearDrive(saveData, connected, log = false) {
  console.log("Connection:", connected ? "Connected" : "Disconnected");
  saveData.networkNickname &&
    console.log("Network nickname:", saveData.networkNickname);
  console.log("Peer seed:", saveData.seed);
  console.log("Network key:", saveData.networkKey);
  console.log("Local drive path:", saveData.localDrivePath);
  console.log("Relay mode:", saveData.relayMode);
  console.log("-----------------");

  if (log) {
    log.info("Connection:", saveData.connected ? "Connected" : "Disconnected");
    saveData.networkNickname &&
      log.info("Network nickname:", saveData.networkNickname);
    log.info("Peer seed:", saveData.seed);
    log.info("Network key:", saveData.networkKey);
    log.info("Local drive path:", saveData.localDrivePath);
    log.info("Relay mode:", saveData.relayMode);
    log.info("-----------------");
  }
}
