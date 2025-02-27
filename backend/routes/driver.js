import express from "express";
import { driverValidationRules, validate } from "../middleware/validator.js";
import { createDriver, findDriver, getDrivers, updateDriver } from "../controller/driversController.js";
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

router.get("/", authenticate, authorizeRole("admin", "superadmin"), getDrivers);

router.get("/:id", authenticate, authorizeRole("admin","superadmin"), findDriver);

router.patch("/:id", authenticate, authorizeRole("admin", "superadmin"),express.json(), updateDriver);
export default router;
