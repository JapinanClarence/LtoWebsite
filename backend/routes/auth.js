import express from "express";
import { registrationValidationRules, validate } from "../middleware/validator.js";
import { login, register } from "../controller/auth/authController.js";

const router = express.Router();

router.post("/login", express.json(), login);

router.post("/register", express.json(), registrationValidationRules(), validate,register);

export default router;