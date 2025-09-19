import { configDotenv } from "dotenv";
import path from "path";

const ENVPATH = path.resolve(process.cwd(), ".env");
configDotenv({ path: ENVPATH });

interface Env {
    node_port: number;
    node_env: string;
    node_host: string;
    node_cors_origin: string;
    node_common_rate_limit_window_ms: number;
    node_common_rate_limit_max_requests: number;
    db_connection: string;
    db_host: string;
    db_port: number;
    db_database: string;
    db_username: string;
    db_password: string;
    jwt_secret: string;
    // ...
}

const env: Env = {
    node_env: process.env.NODE_ENV as string,
    node_port: parseInt(process.env.API_PORT as string),
    node_host: process.env.NODE_HOST as string,
    node_cors_origin: process.env.NODE_CORS_ORIGIN as string,
    node_common_rate_limit_window_ms: parseInt(
        process.env.NODE_COMMON_RATE_LIMIT_WINDOW_MS as string,
    ),
    node_common_rate_limit_max_requests: parseInt(
        process.env.NODE_COMMON_RATE_LIMIT_MAX_REQUESTS as string,
    ),
    db_connection: process.env.DB_CONNECTION as string,
    db_host: process.env.DB_HOST as string,
    db_port: parseInt(process.env.DB_PORT as string),
    db_database: process.env.DB_DATABASE as string,
    db_username: process.env.DB_USERNAME as string,
    db_password: process.env.DB_PASSWORD as string,
    jwt_secret: process.env.JWT_SECRET as string
};

export default env;
