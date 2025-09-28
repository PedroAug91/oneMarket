import { Kysely, sql } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .createTable("reviews")
    .ifNotExists()
    .addColumn("review_id", "serial", (col) => col.primaryKey())
    .addColumn("comment", "text", (col) => col.notNull())
    .addColumn("rating", "integer", (col) => col.notNull())
    .addColumn("customer_id", "integer", (col) => col.notNull())
    .addColumn("service_id", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn("updated_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("reviews").ifExists().execute();
}

export { up, down };
