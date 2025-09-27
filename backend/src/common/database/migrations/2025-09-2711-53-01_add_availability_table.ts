import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("availability")
        .ifNotExists()
        .addColumn("id", "serial", (col) => col.primaryKey())
        .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("availability").ifExists().execute();
}

export { up, down };
