/*!
 * Copyright (C) 2025 PearDrive
 * SPDX-License-Identifier: AGPL-3.0-only
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 */

/**
 * Safely stringify objects
 *
 * @param {Object} obj - The object to stringify
 *
 * @returns {string} - The JSON string representation of the object
 */
export function safeStringify(obj) {
  const seen = new WeakSet();

  return JSON.stringify(obj, (key, value) => {
    // Handle BigInt serialization
    if (typeof value === "bigint") {
      return value.toString() + "n";
    }

    // Handle circular references
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]";
      seen.add(value);
    }

    return value;
  });
}
