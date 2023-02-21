import { colorAvailable, consoleColors } from "../colors";

/**
 * Create a response object.
 *
 * @param color - Color to display the message in color
 * @param message - Display the message
 * @example displayInColor("red", "error");
 * @returns void.
 */

export function displayInColor(color: colorAvailable, message: string): void {
  console.log(consoleColors[color], message, consoleColors.reset);
}
