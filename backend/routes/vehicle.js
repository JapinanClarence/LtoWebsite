import express from "express";
import { validate, vehicleRegistrationRules } from "../middleware/validator.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";
import { createVehicle, getVehicle } from "../controller/vehicleController.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRole("admin", "superadmin"),
  express.json(),
  vehicleRegistrationRules(),
  validate,
  createVehicle
);

router.get("/", authenticate, authorizeRole("admin", "superadmin"), getVehicle);

export default router;
