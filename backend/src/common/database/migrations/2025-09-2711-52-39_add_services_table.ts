import { Kysely, sql } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .createTable("services")
    .ifNotExists()
    .addColumn("service_id", "serial", (col) => col.primaryKey())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("price", "integer", (col) => col.notNull())
    .addColumn("duration", "integer", (col) => col.notNull())
    .addColumn("service_variation_id", "integer", (col) => col.notNull())
    .addColumn("service_provider_id", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn("updated_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("services").ifExists().execute();
}

export { up, down };
