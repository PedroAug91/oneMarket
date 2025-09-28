import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .createTable("service_variations")
    .ifNotExists()
    .addColumn("service_variation_id", "serial", (col) => col.primaryKey())
    .addColumn("service_type", "varchar(100)", (col) => col.notNull())
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("service_variations").ifExists().execute();
}

export { up, down };
