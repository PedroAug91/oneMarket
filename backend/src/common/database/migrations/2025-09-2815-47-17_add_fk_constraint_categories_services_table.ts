import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("categories_services")
    .addForeignKeyConstraint("categories_services_service_id_fk", ["service_id"], "services", ["service_id"])
    .execute();

    await db.schema
    .alterTable("categories_services")
    .addForeignKeyConstraint("categories_services_categories_id_fk", ["category_id"], "categories", ["category_id"])
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("categories_services")
    .dropConstraint("categories_services_categories_id_fk")
    .execute();

    await db.schema
    .alterTable("categories_services")
    .dropConstraint("categories_services_service_id_fk")
    .execute();
}

export { up, down };
