/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import os from "os";
import path from "path";
import process from "process";

/**
 * Resolve the base application folder by OS, with optional env override.
 * Priority:
 *   1) PEARDRIVECLI_HOME
 *   2) Windows: %APPDATA%\peardrivecli
 *      macOS:   ~/Library/Application Support/peardrivecli
 *      Linux:   ${XDG_CONFIG_HOME:-~/.config}/peardrivecli
 */
export function resolveAppHome(appId = "peardrivecli", env = process.env) {
  if (env.PEARDRIVECLI_HOME && env.PEARDRIVECLI_HOME.trim()) {
    return path.resolve(env.PEARDRIVECLI_HOME);
  }

  const home = os.homedir();
  const plat = process.platform;

  if (plat === "win32") {
    const appData = env.APPDATA || path.join(home, "AppData", "Roaming");
    return path.join(appData, appId);
  }

  if (plat === "darwin") {
    return path.join(home, "Library", "Application Support", appId);
  }

  // Linux / Unix (XDG)
  const xdg = env.XDG_CONFIG_HOME || path.join(home, ".config");
  return path.join(xdg, appId);
}
