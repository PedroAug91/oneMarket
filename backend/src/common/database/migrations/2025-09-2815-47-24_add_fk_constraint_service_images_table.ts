import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("service_images")
    .addForeignKeyConstraint("service_images_service_id_fk", ["service_id"], "services", ["service_id"])
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("service_images")
    .dropConstraint("service_images_service_id_fk")
    .execute();
}

export { up, down };
