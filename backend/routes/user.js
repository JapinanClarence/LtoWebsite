import express from "express";
import { findUser } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/profile", findUser);

export default userRouter;
//