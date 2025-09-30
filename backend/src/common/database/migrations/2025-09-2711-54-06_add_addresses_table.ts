import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable("addresses")
        .ifNotExists()
        .addColumn("address_id", "serial", (col) => col.primaryKey())
        .addColumn("country", "varchar(100)", (col) => col.notNull())
        .addColumn("state", "varchar(100)", (col) => col.notNull())
        .addColumn("city", "varchar(100)", (col) => col.notNull())
        .addColumn("street", "varchar(100)", (col) => col.notNull())
        .addColumn("number", "integer", (col) => col.notNull())
        .addColumn("zipcode", "varchar(25)", (col) => col.notNull())
        .addColumn("reference_point", "varchar(100)")
        .addColumn("complement", "varchar(100)")
        .addColumn("latitude", "varchar(100)")
        .addColumn("longitude", "varchar(100)")
        .addColumn("user_id", "integer", (col) => col.notNull())
        .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("addresses").ifExists().execute();
}

export { up, down };
