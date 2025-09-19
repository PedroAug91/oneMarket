#!/usr/bin/env node

import chalk from "chalk";
import { PREFIX } from "./cliTools";
import FileCreatorFactory from "./FileCreator";
import Cli from "./Cli";

async function main(): Promise<void> {
    try {
        const controllerName = await Cli.getControllerName();

        const controller = FileCreatorFactory.createController(controllerName);
        controller.createControllerFile();
    } catch (e: any) {
        console.log(`${PREFIX} ${chalk.italic("Exiting...")}`);
    }
}

main();
