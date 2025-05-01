import path from 'path';
import config from 'config';
export const serverConfig = {
    dbPath : (filename) => path.join(process.cwd(), "db", filename),
    PORT: config.get("PORT") || 3000,
    token_key: config.get("TOKIN_KEY"),
}