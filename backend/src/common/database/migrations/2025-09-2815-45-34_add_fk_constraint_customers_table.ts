import { Kysely } from "kysely";

// Rodar as migrations

async function up(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("customers")
    .addForeignKeyConstraint("customers_user_id_fk", ["user_id"], "users", ["user_id"])
    .execute();
}

// Reverter as migrations

async function down(db: Kysely<any>): Promise<void> {
    await db.schema
    .alterTable("customers")
    .dropConstraint("customers_user_id_fk")
    .execute();
}

export { up, down };
