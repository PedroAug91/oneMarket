import { configDotenv } from "dotenv";
import path from "path";

const ENVPATH = path.resolve(process.cwd(), ".env");

configDotenv({ path: ENVPATH });

export default {
    dialect: "postgres",
    envfile: ENVPATH,
    outFile: "src/common/types/db.d.ts",
    url: process.env.DATABASE_URL,
};
