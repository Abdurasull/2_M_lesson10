import fs from 'fs/promises';
import { serverConfig } from '../config.js';
const {dbPath} = serverConfig

export const model = async (req, res, next) => {
    req.writeFile = async function(fileName, data){
        await fs.writeFile(dbPath(fileName), JSON.stringify(data, null, 4));
        return true;
    };
    req.readFile = async function(fileName){
        let data = await fs.readFile(dbPath(fileName), "utf-8");
        return data ? JSON.parse(data) : [];
    };
    return next();    
}