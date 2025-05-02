import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { validatorRegister } from "../meddlewares/validator.js";
import { chackToken } from "../meddlewares/chackToken.js";

export const authRouter = express.Router();

authRouter.post("/register", validatorRegister, authController.REGISTER);
authRouter.post("/login", authController.LOGIN);
authRouter.post("/add", chackToken, authController.ADDTODO);
authRouter.put("/Edit", chackToken, authController.EDITTODO);
authRouter.delete("/delete", chackToken, authController.DELETETODO);
authRouter.put("/done", chackToken, authController.DONETODO);

