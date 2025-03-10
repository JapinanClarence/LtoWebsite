import express from "express";
import { driverValidationRules, validate } from "../middleware/validator.js";
import { createDriver, findDriver, getDrivers, updateDriver } from "../controller/driversController.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";
const driverRouter = express.Router();

driverRouter.post(
  "/",
  authenticate,
  authorizeRole("admin", "superadmin"),
  express.json(),
  driverValidationRules(),
  validate,
  createDriver
);

driverRouter.get("/", authenticate, authorizeRole("admin", "superadmin"), getDrivers);

driverRouter.get("/:id", authenticate, authorizeRole("admin","superadmin"), findDriver);

driverRouter.patch("/:id", authenticate, authorizeRole("admin", "superadmin"),express.json(), updateDriver);

export default driverRouter;
