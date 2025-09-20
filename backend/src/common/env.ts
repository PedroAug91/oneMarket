import { configDotenv } from "dotenv";
import path from "path";

const ENVPATH = path.resolve(process.cwd(), ".env");
configDotenv({ path: ENVPATH });

interface Env {
    api_port: number;
    api_env: string;
    api_host: string;
    api_cors_origin: string;
    api_common_rate_limit_window_ms: number;
    api_common_rate_limit_max_requests: number;
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
    api_env: process.env.API_ENV as string,
    api_port: parseInt(process.env.API_PORT as string),
    api_host: process.env.API_HOST as string,
    api_cors_origin: process.env.API_CORS_ORIGIN as string,
    api_common_rate_limit_window_ms: parseInt(process.env.API_COMMON_RATE_LIMIT_WINDOW_MS as string),
    api_common_rate_limit_max_requests: parseInt(process.env.API_COMMON_RATE_LIMIT_MAX_REQUESTS as string),
    db_connection: process.env.DB_CONNECTION as string,
    db_host: process.env.DB_HOST as string,
    db_port: parseInt(process.env.DB_PORT as string),
    db_database: process.env.DB_DATABASE as string,
    db_username: process.env.DB_USERNAME as string,
    db_password: process.env.DB_PASSWORD as string,
    jwt_secret: process.env.JWT_SECRET as string
};

export default env;
