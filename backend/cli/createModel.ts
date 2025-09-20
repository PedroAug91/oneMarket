#!/usr/bin/env node

import { PREFIX, cyan } from "./cliTools";
import chalk from "chalk";
import FileCreatorFactory from "./FileCreator";
import Cli, { Prompts } from "./Cli";

type FileTypes = Array<"migration" | "controller" | "router">;

async function main(): Promise<void> {
    try {
        const modelName = await Cli.getModelName()

        console.log();

        const [key1, key2, key3] = [
            cyan("<↑,↓> <k,j>"),
            cyan("<Space>"),
            cyan("<Ctrl-a> <a>"),
        ];
        const choices = [
            { name: "Migration", value: "migration" },
            { name: "Controller", value: "controller" },
            { name: "Router", value: "router" },
        ];

        const msg2: string = `Create additional files: (${key1} to move, ${key2} to select, ${key3} to select all)`;
        const fileTypes: FileTypes = await Prompts.selectMultiple(msg2, choices);

        const tableName = modelName.toLowerCase() + "s";
        const model = FileCreatorFactory.createModel(modelName, tableName);
        model.createModelFile();

        if (fileTypes.includes("controller")) {
            const controller = FileCreatorFactory.createController(
                modelName,
                modelName,
            );
            controller.createControllerFile();
        }

        if (fileTypes.includes("migration")) {
            const migration = FileCreatorFactory.createMigration("create");
            migration.createMigrationFile(`add_${tableName}_table`, tableName);
        }

        if (fileTypes.includes("router")) {
            const router = FileCreatorFactory.createRouter(
                modelName.toLowerCase(),
                modelName,
            );
            router.createRouterFile();
        }
    } catch (e: any) {
        console.log(`${PREFIX} ${chalk.italic("Exiting...")}`);
    }
}

main();
