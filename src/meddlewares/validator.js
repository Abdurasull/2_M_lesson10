import { globalError, serverError, ClientError } from "../utils/error.js";

const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


export const validatorRegister = async (req, res, next) => {
    try{
        let {email} = req.body;
        if(!regex.test(email)) throw new ClientError("Email invalid", 400);
        let users = await req.readFile("users.json");
        let user = users.find(user => user.email === email);
        if(user) throw new ClientError("Email already exists", 400);
        next();
    }catch(err){
        globalError(err, res);
    }
} 