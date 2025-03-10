import express from "express";
import { validate, vehicleRegistrationRules } from "../middleware/validator.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";
import { createVehicle, findVehicle, getVehicle } from "../controller/vehicleController.js";

const vehicleRouter = express.Router();

vehicleRouter.post(
  "/",
  authenticate,
  authorizeRole("admin", "superadmin"),
  express.json(),
  vehicleRegistrationRules(),
  validate,
  createVehicle
);

vehicleRouter.get("/", authenticate, authorizeRole("admin", "superadmin"), getVehicle);
vehicleRouter.get("/:id", authenticate, authorizeRole("admin", "superadmin"), findVehicle);

export default vehicleRouter;
