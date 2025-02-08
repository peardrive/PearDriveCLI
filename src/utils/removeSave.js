import fs from "bare-fs";

import * as C from "../constants";
import { getSaveData } from "./getSaveData";

/** Remove save data from save file */
export function removeSave(networkKey) {
  const data = getSaveData();
  if (data) {
    const newData = data.filter((d) => d.networkKey !== networkKey);
    fs.writeFileSync(C.SAVE_FILE, JSON.stringify(newData));
  }
}
