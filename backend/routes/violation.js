import express from "express";
import {
  createViolation,
  getViolations,
  getViolationById,
  updateViolation,
  deleteViolation,
} from "../controller/violationController.js";
import { validateViolation, validate } from "../middleware/validator.js";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a violation (Only Admin or Superadmin)
router.post("/", authenticate, authorizeRole("admin", "superadmin"), express.json(), validateViolation, validate, createViolation);

// Get all violations (Authenticated Users)
router.get("/", authenticate, getViolations);

// Get a single violation by ID (Authenticated Users)
router.get("/:id", authenticate, getViolationById);

// Update a violation (Only Admin or Superadmin)
router.patch("/:id", authenticate, authorizeRole("admin", "superadmin"), express.json(), validateViolation, validate, updateViolation);

// Delete a violation (Only Admin or Superadmin)
router.delete("/:id", authenticate, authorizeRole("admin", "superadmin"), deleteViolation);

export default router;
