/** Clear terminal text */
export function clearTerminal() {
  console.log("\x1B[2J\x1B[0f");
}
