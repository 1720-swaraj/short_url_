import express from "express";
import {
  handleUserLogin,
  handleUserSignUp,
} from "../controller/userController.mjs";
export const userRouter = express.Router();

userRouter.post("/", handleUserSignUp);
userRouter.post("/login", handleUserLogin);



