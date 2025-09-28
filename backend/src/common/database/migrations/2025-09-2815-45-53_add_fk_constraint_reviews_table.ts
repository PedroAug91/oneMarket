import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("reviews")
    .addForeignKeyConstraint("reviews_customer_id_fk", ["customer_id"], "customers", ["customer_id"])
    .execute();

    await db.schema
    .alterTable("reviews")
    .addForeignKeyConstraint("reviews_service_id_fk", ["service_id"], "services", ["service_id"])
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("reviews")
    .dropConstraint("reviews_service_id_fk")
    .execute();

    await db.schema
    .alterTable("reviews")
    .dropConstraint("reviews_customer_id_fk")
    .execute();
}

export { up, down };
