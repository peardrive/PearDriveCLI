/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */
import { lib } from "@hopets/pear-core";

import * as C from "../../@constants";
import globalState from "../../@globalState";
import * as utils from "../../@utils";
import * as log from "../../@log";
import { mainMenu } from "..";
import * as handlers from "..";
const { print } = utils;

/**
 * Format datatype for nonlocal files
 *
 * @param {Map} fileMap - Map of nonlocal files with peer keys
 *
 * @returns {Array} - Array of formatted file objects
 */
function formatNonlocalFileMap(fileMap) {
  const formattedFiles = [];

  // Convery nonlocalFileMap to an array of files with peer keys
  fileMap.forEach((entry, index) => {
    // For each peer (entry), loop through files
    entry.files.forEach((file) => {
      // Check if file has already been added (from another peer)
      let updatedFile = false;
      formattedFiles.forEach((tmpFile) => {
        if (tmpFile.path === file.path) {
          updatedFile = true;
          tmpFile.peer.push(index);
        }
      });

      // If file not already added, add it with peer key
      if (!updatedFile) {
        formattedFiles.push({
          ...file,
          peer: [index],
        });
      }
    });
  });

  return formattedFiles;
}

/**
 * Print out a file object for nonlocal file
 *
 * @param {Object} file - The file object to log, from formatNonlocalFileMap
 *
 * @param {number} index - The index of the file in the list
 */
function fileLog(file, index) {
  const path = file.path;
  const size = utils.fileSizeStr(file.size);
  const timeAgo = utils.relativeTimeAgoStr(file.modified);
  const peers = file.peer.length;
  return `  [${index}]: ${path} (${size}) - ${timeAgo} [Peers: ${peers}]`;
}

/** NETWORK_MENU.NETWORK request handler
 *
 * @param {boolean} [clear=true] - whether to clear the terminal before
 * the menu is displayed
 */
export async function req(clear = true, message = "") {
  log.info("Requesting NETWORK_MENU.NETWORK");
  if (clear) print.clear();
  else print.newLine();
  globalState.currentState = C.CLI_STATE.NETWORK_MENU.NETWORK;

  // Get the selected PearDrive
  const pearDrive = globalState.getSelectedPearDrive();

  // Ensure a PearDrive is selected
  if (!pearDrive) {
    print.doubleSlashEqualsDivider();
    print.doubleSlashBorder("No PearDrive selected");
    print.doubleSlashEqualsDivider();
    log.error("No PearDrive selected");
    handlers.mainMenu.req(false);
    return;
  }

  try {
    // Get nonlocal files, add to global state
    const nonlocalFileMap = await pearDrive.listNonLocalFiles();
    const formattedFiles = formatNonlocalFileMap(nonlocalFileMap);
    globalState.nonlocalFiles = formattedFiles || [];

    // Header
    print.doubleSlashEqualsDivider();
    print.doubleSlashBorder(
      `🍐 Nonlocal Files for PearDrive [${globalState.selectedPearDrive}]`
    );
    print.divider();
    print.doubleSlashBorder("  Path | (Size) | - Last Modified | [Peers]");
    print.divider();

    // Print nonlocal files
    print.slashBorder();
    if (formattedFiles.length === 0) {
      print.slashBorder();
      print.slashBorder("No nonlocal PearDrive files found.");
      print.slashBorder();
    } else {
      formattedFiles.forEach((file, index) => {
        print.slashBorder(fileLog(file, index));
        print.slashBorder();
      });
    }

    if (message) {
      print.divider();
      print.doubleSlashBorder(message);
    }

    // Footer
    print.divider();
    print.doubleSlashBorder(
      "Enter the file number [n] to download it from the network."
    );
    print.doubleSlashBorder("Enter 'b' or 'back' to return to network menu.");
    print.doubleSlashEqualsDivider();
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

  if (response.toLowerCase() === "back" || response.toLowerCase() === "b") {
    console.log("Returning to network menu...");
    log.info("Returning to LIST_NETWORK.SELECTED in NETWORK_MENU.NETWORK");
    handlers.listNetwork.selected.req(true);
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

  // Get the file for download
  const resIndex = parseInt(response);
  const selectedFile = globalState.nonlocalFiles[resIndex];
  const downloadPath = selectedFile.path;
  const downloadPeer = selectedFile.peer[0]; // Download from the first peer
  console.log("Download peer", downloadPeer);
  console.log("Download path", downloadPath);
  console.log(`Selected file: ${selectedFile} Downloading...`);
  try {
    const pearDrive = globalState.getSelectedPearDrive();
    await pearDrive.downloadFileFromPeer(downloadPeer, downloadPath);
    req(true, "File downloaded successfully.");
  } catch (error) {
    console.error("Error downloading file:", error);
    log.error("Error downloading file in NETWORK_MENU.NETWORK", error);
    handlers.mainMenu.req(false);
    return;
  }
}
