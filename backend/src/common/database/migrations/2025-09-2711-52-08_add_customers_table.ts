import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("customers")
        .ifNotExists()
        .addColumn("id", "serial", (col) => col.primaryKey())
        .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("customers").ifExists().execute();
}

export { up, down };
