import { Kysely, sql } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .createTable("service_images")
    .ifNotExists()
    .addColumn("service_images_id", "serial", (col) => col.primaryKey())
    .addColumn("image_name", "varchar(150)", (col) => col.notNull())
    .addColumn("filetype", "varchar(10)", (col) => col.notNull())
    .addColumn("service_id", "integer", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn("updated_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("service_images").ifExists().execute();
}

export { up, down };
