/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import fs from "fs";

/** Ensure a directory exists and is secure */
export function ensureDirSecure(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  } else {
    // Best-effort tighten on Unix; harmless on Windows
    try {
      fs.chmodSync(dir, 0o700);
    } catch {}
  }
}
