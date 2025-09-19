#!/usr/bin/env node

import chalk from "chalk";
import { PREFIX, cyan } from "./cliTools";
import FileCreatorFactory from "./FileCreator";
import Cli, { Prompts } from "./Cli";

type MigrationType = "blank" | "update" | "create";

async function main(): Promise<void> {
    try {
        const [key1, key2] = [cyan("<↓,↑> <j,k>"), cyan("<Enter>")];
        const msg = `${chalk.bold("Migration")} type: (${key1} to move, ${key2} to select)`;
        const choices = [
            { name: "Blank", value: "blank" },
            { name: "Update", value: "update" },
            { name: "Create", value: "create" },
        ];

        const migrationType: MigrationType = await Prompts.selectOne(msg, choices);

        console.log();

        const migration = FileCreatorFactory.createMigration(migrationType);

        if (migrationType === "blank") {
            const migrationName = await Cli.getMigrationName();
            migration.createMigrationFile(migrationName);
            process.exit(0);
        }

        const tableName = await Prompts.input(`Insert the ${chalk.bold("Table's")} name:`);

        let migrationName = "";
        switch (migrationType) {
            case "create":
                migrationName = `add_${tableName.trim().toLowerCase()}_table`;
                break;
            case "update":
                migrationName = `update_${tableName.trim().toLowerCase()}_table`;
                break;
        }

        migration.createMigrationFile(migrationName, tableName);
    } catch (e: any) {
        console.log(`${PREFIX} ${chalk.italic("Exiting...")}`);
    }
}

main();
