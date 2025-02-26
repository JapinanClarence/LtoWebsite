import express from "express";
import { driverValidationRules, validate } from "../middleware/validator.js";
import { createDriver } from "../controller/driversController.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRole("admin", "superadmin"),
  express.json(),
  driverValidationRules(),
  validate,
  createDriver
);

export default router;
