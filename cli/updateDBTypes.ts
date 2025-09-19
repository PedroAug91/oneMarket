import { appendFileSync, readFileSync } from "fs";
import path from "path";
import { ERROR, INFO } from "./cliTools.ts";
import chalk from "chalk";

const dbFilepath = path.join(process.cwd(), "src/common/types/db.d.ts");
const typesFilepath = path.join(process.cwd(), "src/common/types/index.ts");

const dbBuffer = readFileSync(dbFilepath, "utf-8");
const typeBuffer = readFileSync(typesFilepath, "utf-8");

const start = dbBuffer.search(/export interface DB {/g);
const tableSchema = dbBuffer.slice(start);
const keys = [...tableSchema.matchAll(/\w+(?=:)/g)].map((m) => m[0]);

const kyselyTypes: string[] = keys.map((t: string) => {
    const tUpper: string = t.charAt(0).toUpperCase() + t.slice(1, t.length - 1);
    let lines: string = "";

    if (!typeBuffer.includes(`Selectable${tUpper}`))
        lines =
            lines
            + `export type Selectable${tUpper} = Selectable<DB["${t}"]>;\n`;
    if (!typeBuffer.includes(`Insertable${tUpper}`))
        lines =
            lines
            + `export type Insertable${tUpper} = Insertable<DB["${t}"]>;\n`;
    if (!typeBuffer.includes(`Updateable${tUpper}`))
        lines =
            lines
            + `export type Updateable${tUpper} = Updateable<DB["${t}"]>;\n`;

    return lines;
});

if (kyselyTypes[0] === "") {
    const trimmedPath = chalk.bold(`[${dbFilepath.match(/(src).*/g)}]`);
    console.log(`${INFO} Nenhuma tabela nova foi encontrada.\n`);
    console.log(
        `${INFO} Verifique o arquivo em ${trimmedPath} para possíveis mudanças em colunas das tabelas.`,
    );
} else {
    const trimmedPath = chalk.bold(`[${typesFilepath.match(/(src).*/g)}]`);
    try {
        appendFileSync(typesFilepath, kyselyTypes.join("\n").trim());
        console.log(
            `${INFO} Novas tabelas foram encontradas. Aqui estão as alterações no arquivo ${trimmedPath}:\n`,
        );
        console.log(kyselyTypes.join("\n").trim());
    } catch (err: any) {
        console.error(
            `${ERROR} Não foi possível atualizar o arquivo ${chalk.bold(trimmedPath)}:`,
        );
        console.error(err);
    }
}
