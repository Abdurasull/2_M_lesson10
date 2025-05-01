import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { validatorRegister } from "../meddlewares/validator.js";

export const authRouter = express.Router();

authRouter.post("/register", validatorRegister, authController.REGISTER);
authRouter.post("/add", authController.ADDTODO);
