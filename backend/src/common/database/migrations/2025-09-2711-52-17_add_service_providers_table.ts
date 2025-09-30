import { Kysely, sql } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .createTable("service_providers")
    .ifNotExists()
    .addColumn("service_provider_id", "serial", (col) => col.primaryKey())
    .addColumn("cnpj", "varchar(14)", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("user_id", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn("updated_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("service_providers").ifExists().execute();
}

export { up, down };
