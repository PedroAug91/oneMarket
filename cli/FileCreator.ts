import fs from "fs";
import { DateTime } from "luxon";
import path from "path";
import { ERROR, INFO } from "./cliTools";
import chalk from "chalk";

interface Replacement {
    expr: RegExp;
    content: string;
}

abstract class FileGenerator {
    protected templatePath: string;
    protected outputDir: string;

    constructor(templateName: string, outputDir: string) {
        this.templatePath = path.join(
            process.cwd(),
            "cli/templates",
            templateName,
        );
        this.outputDir = outputDir;
    }

    protected getTemplate(): string {
        return fs.readFileSync(this.templatePath, { encoding: "utf8" });
    }

    protected processTemplate(
        template: string,
        replacements: Replacement[],
    ): string {
        for (const replacement of replacements) {
            template = template.replace(replacement.expr, replacement.content);
        }
        return template;
    }

    protected logSuccess(fileName: string) {
        const trimmedPath = path.join(this.outputDir, fileName);
        const styledPath = chalk.bold(`[${trimmedPath}]`);
        console.log(
            `\n${INFO} ${chalk.bold(this.getFileType())} created at ${styledPath}.`,
        );
    }

    protected writeFile(fileName: string, content: string) {
        const filePath = path.join(process.cwd(), this.outputDir, fileName);
        fs.writeFileSync(filePath, content, { encoding: "utf8" });
    }

    protected createFile(fileName: string, replacements: Replacement[] = []) {
        try {
            const template = this.getTemplate();
            const processedTemplate = this.processTemplate(
                template,
                replacements,
            );
            this.writeFile(fileName, processedTemplate);
            this.logSuccess(fileName);
        } catch (err: any) {
            console.error(
                `\n${ERROR} Could not create the ${this.getFileType()}.\n`,
            );
            console.error(err);
        }
    }

    protected abstract getFileType():
        | "Model"
        | "Router"
        | "Controller"
        | "Migration";
}

class CreateMigration extends FileGenerator {
    private type: "update" | "create" | "blank";

    constructor(type: "update" | "create" | "blank") {
        super(`migration.${type}.template`, "src/common/database/migrations");
        this.type = type;
    }

    createMigrationFile(migrationName: string, tableName?: string) {
        const dt = DateTime.now().setZone("America/Recife");
        const iso8601Prefix = `${dt.toISODate()}${dt.toFormat("HH-mm-ss")}`;
        const fileName = `${iso8601Prefix}_${migrationName}.ts`;

        const replacements: Replacement[] = [];

        if (this.type !== "blank" && tableName) {
            replacements.push({ content: tableName, expr: /{{ TableName }}/g });
        }

        this.createFile(fileName, replacements);
    }

    getFileType(): "Model" | "Router" | "Controller" | "Migration" {
        return "Migration";
    }
}

class CreateModel extends FileGenerator {
    modelName: string;
    table: string;

    constructor(modelName: string, table: string) {
        super("model.template", "src/api/models");
        this.modelName = modelName;
        this.table = table;
    }

    createModelFile() {
        const replacements: Replacement[] = [
            { expr: /{{ ModelName }}/g, content: this.modelName },
            { expr: /{{ TableName }}/g, content: this.table },
        ];

        this.createFile(`${this.modelName}.ts`, replacements);
    }

    protected getFileType(): "Model" | "Router" | "Controller" | "Migration" {
        return "Model";
    }
}

class CreateRouter extends FileGenerator {
    protected routerName: string;
    protected controllerFile: string;
    protected controllerName: string;
    protected routerFile: string;

    constructor(routerName: string, controllerName: string) {
        super("router.template", "src/api/routers");
        this.routerName = `${routerName}Router`;
        this.routerFile = routerName.toLowerCase();
        this.controllerName = `${controllerName}Controller`;
        this.controllerFile = controllerName.toLowerCase();
    }

    createRouterFile() {
        const replacements: Replacement[] = [
            { expr: /{{ RouterName }}/g, content: this.routerName },
            { expr: /{{ ControllerName }}/g, content: this.controllerName },
            { expr: /{{ ControllerFile }}/g, content: this.controllerFile },
        ];

        this.createFile(`${this.routerFile}.router.ts`, replacements);
    }

    protected getFileType(): "Model" | "Router" | "Controller" | "Migration" {
        return "Router";
    }
}

class CreateController extends FileGenerator {
    controllerName: string;
    modelName: string | undefined;

    constructor(controllerName: string, modelName?: string) {
        super("controller.template", "src/api/controllers");
        this.controllerName = controllerName;
        this.modelName = modelName;
    }

    createControllerFile() {
        const modelImport = this.modelName
            ? `import ${this.modelName} from "../models/${this.modelName}.js"\n`
            : "";
        const replacements: Replacement[] = [
            { expr: /{{ ImportModel }}/g, content: modelImport },
            {
                expr: /{{ ControllerName }}/g,
                content: `${this.controllerName}Controller`,
            },
        ];

        this.createFile(
            `${this.controllerName.toLowerCase()}.controller.ts`,
            replacements,
        );
    }

    protected getFileType(): "Model" | "Router" | "Controller" | "Migration" {
        return "Controller";
    }
}

export default class FileCreatorFactory {
    static createModel(modelName: string, table: string): CreateModel {
        return new CreateModel(modelName, table);
    }

    static createController(
        controllerName: string,
        modelName?: string,
    ): CreateController {
        return new CreateController(controllerName, modelName);
    }

    static createRouter(
        routerName: string,
        controllerName: string,
    ): CreateRouter {
        return new CreateRouter(routerName, controllerName);
    }

    static createMigration(
        type: "update" | "create" | "blank",
    ): CreateMigration {
        return new CreateMigration(type);
    }
}
