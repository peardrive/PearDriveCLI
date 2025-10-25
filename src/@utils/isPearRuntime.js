/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

import process from "process";

/** Pear/Bare detector with an override */
export function isPearRuntime() {
  if (process.versions?.bare) return true;
  if (process.release?.name === "bare") return true;
  if (typeof globalThis.Pear !== "undefined") return true;
  const exec = (process.execPath || "").toLowerCase();
  if (exec.includes("pear") || exec.includes("bare")) return true;

  return false;
}
