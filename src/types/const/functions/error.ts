import { handleResponse } from "../../../makerRequest/handleResponse";
import { ConsoleColor, consoleColors } from "../colors";
import { displayInColor } from "./displayInColor";

export function checkIfIsEmpty(error: string, ...args: any[]): void {
  for (const arg of args) {
    for (const test of arg) {
      if (!test) {
        throw new Error(error);
      }
    }
    // for (let i = 0; arg[i]; i++) {
    //   console.log("test", arg[i]);
    // }
  }
}

export function errorManage(
  res: Express.Response | undefined,
  checkError: (...args: any) => void,
  error: string,
  ...args: any
) {
  try {
    checkError(error, args);
  } catch (err) {
    displayInColor("bgRed", err.message);
  }
}
