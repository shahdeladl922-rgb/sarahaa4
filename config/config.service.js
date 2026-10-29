import { config } from "dotenv";
import { resolve } from "node:path";

const NODE_ENV = process.env.NODE_ENV;

const envPath = {
    development: ".env.development",
    production: ".env.production",
}



config({ path: resolve(`config/${envPath[NODE_ENV]}`) });

export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const RADIS_URI = process.env.RADIS_URI;
export const AUDIENCE_EMAIL = process.env.AUDIENCE_EMAIL;
export const ACCESS_TOKEN_SIGNITURE = process.env.ACCESS_TOKEN_SIGNITURE;
export const REFRESH_TOKEN_SIGNITURE = process.env.REFRESH_TOKEN_SIGNITURE;
export const USER_EMAIL = process.env.USER_EMAIL;
export const PASS_EMAIL = process.env.PASS_EMAIL;
export const ENCRYPTION_KEY_UN = process.env.ENCRYPTION_KEY_UN;
export const ALLOW_ORGINS = process.env.ALLOW_ORGINS.split(',') || [];