import { checkbox, input, select } from "@inquirer/prompts";

import chalk from "chalk";
import { bgCyan, capitalizeName, cyan, PREFIX } from "./cliTools";

type Choice = { name: string; value: string };

class Prompts {
    static async input(msg: string, capitalize: boolean = false) {
        return await input({
            message: msg,
            required: true,
            theme: {
                prefix: PREFIX,
                validationFailureMode: "keep",
                style: {
                    answer: (strRaw: string) => {
                        let str: string;

                        if (capitalize) {
                            str = ` ${chalk.bold(capitalizeName(strRaw))} `;
                        } else {
                            str = ` ${chalk.bold(strRaw.trim().toLowerCase())} `;
                        }
                        return bgCyan(str);
                    },
                    message: (text: string) => text,
                },
            },
        });
    }

    static async selectMultiple<T>(msg: string, choices: Choice[]) {
        return (await checkbox({
            message: msg,
            loop: true,
            choices: choices,
            instructions: false,
            required: true,
            theme: {
                prefix: PREFIX,
                icon: {
                    checked: " [X]",
                    unchecked: " [ ]",
                    cursor: chalk.bold(">"),
                },
                style: {
                    answer: (s: string) => {
                        return s ? bgCyan(` ${chalk.bold(s)} `) : "";
                    },
                    highlight: (s: string) => cyan(s),
                },
                helpMode: "never",
            },
        })) as T;
    }

    static async selectOne<T = string>(msg: string, choices: Choice[]) {
        return (await select({
            message: msg,
            loop: true,
            choices: choices,
            theme: {
                prefix: PREFIX,
                icon: { cursor: chalk.bold(">") },
                style: {
                    answer: (s: string) => {
                        return s ? bgCyan(` ${chalk.bold(s)} `) : "";
                    },
                    highlight: (s: string) => cyan(s),
                },
                helpMode: "never",
            },
        })) as T;
    }

    static async getName(msg: string, capitalize: boolean = false): Promise<string> {
        const name = await Prompts.input(msg, capitalize);

        if (capitalize) {
            return capitalizeName(name);
        }

        return name
    }

}

class Cli {
    static async getControllerName() {
        const msg: string = `Insert the ${chalk.bold("Controller's")} name:`;
        return await Prompts.getName(msg, true);
    }

    static async getMigrationName() {
        const msg = `Insert the ${chalk.bold("Migration")} name:`;
        return await Prompts.getName(msg)
    }

    static async getModelName() {
        const msg: string = `Insert the ${chalk.bold("Model")} name:`;
        return await Prompts.getName(msg, true)
    }

    static async getRouterName() {
        const msg: string = `Insert the ${chalk.bold("Router's")} name:`;
        return await Prompts.getName(msg);
    }
}

export default Cli;
export { Prompts };
