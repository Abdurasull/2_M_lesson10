import { jwtToken } from "../lib/jwt.js";
import { globalError } from "../utils/error.js";
import { serverConfig } from "../config.js";;

export const chackToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        jwtToken.verifyToken(token, serverConfig.token_key);
        return next();

    }catch(err){
        globalError(err, res);
    }
}



