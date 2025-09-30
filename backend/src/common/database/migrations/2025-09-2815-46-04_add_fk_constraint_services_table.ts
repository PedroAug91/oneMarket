import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("services")
    .addForeignKeyConstraint("services_service_variation_id_fk", ["service_variation_id"], "service_variations", ["service_variation_id"])
    .execute();

    await db.schema
    .alterTable("services")
    .addForeignKeyConstraint("services_service_provider_id_fk", ["service_provider_id"], "service_providers", ["service_provider_id"])
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("services")
    .dropConstraint("services_service_variation_id_fk")
    .execute();

    await db.schema
    .alterTable("services")
    .dropConstraint("services_service_provider_id_fk")
    .execute();
}

export { up, down };
