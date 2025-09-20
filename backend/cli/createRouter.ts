#!/usr/bin/env node

import { PREFIX, capitalizeName, cyan } from "./cliTools";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import FileCreatorFactory from "./FileCreator";
import Cli, { Prompts } from "./Cli";

function getControllers(): string[] {
    const dirpath: string = path.join(process.cwd(), "src/api/controllers");
    const controllers: string[] = fs
        .readdirSync(dirpath, "utf-8")
        .map((f) => f.split(".")[0]);

    return controllers;
}

async function main(): Promise<void> {
    try {
        const routerName = await Cli.getRouterName()

        console.log();

        const [key1, key2] = [cyan("<↓,↑> <j,k>"), cyan("<Enter>")];

        const controllers = getControllers();
        let choices = controllers.map((c) => {
            return { name: c, value: c };
        });

        const msg: string = `Create additional files: (${key1} to move, ${key2} to select)`;
        choices = [{ name: "New controller", value: "new" }, ...choices];
        const controller = await Prompts.selectOne(msg, choices);

        const controllerName = capitalizeName(routerName);
        const router = FileCreatorFactory.createRouter(
            routerName,
            controllerName,
        );
        router.createRouterFile();

        if (controller === "new") {
            console.log();
            const controllerName = await Cli.getControllerName();
            const controller = FileCreatorFactory.createController(controllerName);
            controller.createControllerFile();
        }
    } catch (err: any) {
        console.log(`${PREFIX} ${chalk.italic("Exiting...")}`);
    }
}

main();
