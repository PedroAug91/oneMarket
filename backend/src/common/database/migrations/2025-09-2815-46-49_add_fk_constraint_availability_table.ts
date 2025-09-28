import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("availability")
    .addForeignKeyConstraint("availability_customer_id_fk", ["customer_id"], "customers", ["customer_id"])
    .execute();

    await db.schema
    .alterTable("availability")
    .addForeignKeyConstraint("availability_service_provider_id_fk", ["service_provider_id"], "service_providers", ["service_provider_id"])
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("availability")
    .dropConstraint("availability_service_provider_id_fk")
    .execute();

    await db.schema
    .alterTable("availability")
    .dropConstraint("availability_customer_id_fk")
    .execute();
}

export { up, down };
