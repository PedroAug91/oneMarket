import chalk from "chalk";

export const bgCyan = chalk.bgHex("#03C2FC");
export const bgRed = chalk.bgHex("#FF4242");
export const cyan = chalk.hex("#85F9FF");

export const INFO = `    ${bgCyan(chalk.bold(" INFO "))}`;
export const ERROR = `    ${bgRed(chalk.bold(" ERROR "))}`;
export const PREFIX = chalk.bold(">>>");

export function capitalizeName(name: string) {
    return name.charAt(0).trim().toUpperCase() + name.slice(1).trim();
}
