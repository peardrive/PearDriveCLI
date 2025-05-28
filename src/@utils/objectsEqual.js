/** Check if two objects match
 *
 *
 * @param {Object} a - The first object to compare
 * @param {Object} b - The second object to compare
 *
 * @returns {boolean} - True if the objects match, false otherwise
 */
export function objectsEqual(a, b) {
  if (a === b) return true;

  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a == null ||
    b == null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
