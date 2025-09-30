import { Kysely, sql } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("user_id", "serial", (col) => col.primaryKey())
    .addColumn("username", "varchar(200)", (col) => col.notNull())
    .addColumn("role", "varchar(20)", (col) => col.notNull())
    .addColumn("email", "varchar(150)", (col) => col.unique().notNull())
    .addColumn("phone_number", "varchar(15)", (col) => col.notNull())
    .addColumn("password", "varchar(60)", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn("updated_at", "timestamptz", (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("users").ifExists().execute();
}

export { up, down };
