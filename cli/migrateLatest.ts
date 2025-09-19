import * as path from "path";
import { promises as fs } from "fs";
import { Migrator, FileMigrationProvider } from "kysely";
import db from "../database/connection";
import chalk from "chalk";
import { ERROR, INFO } from "./cliTools";

async function migrateToLatest() {
    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs,
            path,
            migrationFolder: path.join(
                process.cwd(),
                "src/common/database/migrations",
            ),
        }),
    });

    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((it) => {
        const migrationName = chalk.bold(`[${it.migrationName}]`);
        if (it.status === "Success") {
            console.log(
                `${INFO} Migration ${migrationName} foi executada com sucesso.\n`,
            );
        } else {
            console.error(
                `${ERROR} Erro ao executar migration ${migrationName}\n`,
            );
        }
    });

    if (error) {
        console.error(
            `${ERROR} Não foi possível executar uma ou mais migrations.\n`,
        );
        console.error(error);
        process.exit(1);
    }

    console.log(`${INFO} Todas migrations foram executadas com sucesso.\n`);

    await db.destroy();
}

migrateToLatest();
