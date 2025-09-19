import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import env from "../env.js";

import type { DB } from "../types/db.d";

const dialect = new PostgresDialect({
    pool: new Pool({
        database: env.db_database,
        host: env.db_host,
        user: env.db_username,
        password: env.db_password,
        port: env.db_port,
    }),
});

const db = new Kysely<DB>({ dialect });

export default db;
