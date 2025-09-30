import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .createTable("categories_services")
    .ifNotExists()
    .addColumn("service_id", "integer", (col) => col.notNull())
    .addColumn("category_id", "integer", (col) => col.notNull())
    .addPrimaryKeyConstraint("categories_services_pk", ["category_id", "service_id"])
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable("categories_services").ifExists().execute();
}

export { up, down };
