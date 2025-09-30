import { Kysely, sql } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .createTable("availability")
    .ifNotExists()
    .addColumn("availability_id", "serial", (col) => col.primaryKey())
    .addColumn("start_date", "date", (col) => col.notNull())
    .addColumn("end_date", "date", (col) => col.notNull())
    .addColumn("start_time", "time", (col) => col.notNull())
    .addColumn("end_time", "time", (col) => col.notNull())
    .addColumn("status", "varchar(15)", (col) => col.notNull())
    .addColumn("weekday", "smallint")
    .addColumn("customer_id", "integer")
    .addColumn("service_provider_id", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn("updated_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("availability").ifExists().execute();
}

export { up, down };
