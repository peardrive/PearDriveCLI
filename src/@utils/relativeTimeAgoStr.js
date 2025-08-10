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
 * Turn the date from stats and convert it to human readable relative time ago
 * string
 *
 * @param {number} dateInt - Date in milliseconds since epoch
 *
 * @return {string} - Relative time ago string
 */
export function relativeTimeAgoStr(dateInt) {
  const now = Date.now();

  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;
  const weeks = days * 7;
  const months = days * 30;
  const years = days * 365;

  const secondsAgo = Math.floor((now - dateInt) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const weeksAgo = Math.floor(daysAgo / 7);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(daysAgo / 365);

  if (yearsAgo > 0) {
    if (yearsAgo === 1) return "last year";
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  } else if (monthsAgo > 0) {
    if (monthsAgo === 1) return "last month";
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else if (weeksAgo > 0) {
    if (weeksAgo === 1) return "last week";
    return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
  } else if (daysAgo > 0) {
    if (daysAgo === 1) return "yesterday";
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (hoursAgo > 0) {
    if (hoursAgo === 1) return "an hour ago";
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (minutesAgo > 0) {
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else {
    return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ago`;
  }
}
