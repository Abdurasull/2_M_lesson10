
import pkg from "jsonwebtoken";
import { serverConfig } from '../config.js';
const {token_key} = serverConfig;
const {sign, verify} = pkg;


export const jwtToken = {
    createToken: (payload) => sign(payload, token_key),
    verifyToken: (token) => verify(token, token_key)
}