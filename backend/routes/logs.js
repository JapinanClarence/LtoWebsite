import express from "express";
import authenticate, { authorizeRole } from "../middleware/authMiddleware.js";
import { getDriverLogs, getLogs } from "../controller/driverLogsController.js";

const logsRouter = express.Router();

logsRouter.get("/", authenticate, authorizeRole("admin", "superadmin"), getLogs);   
logsRouter.get("/:id", authenticate, authorizeRole("admin", "superadmin", "driver"), getDriverLogs);

export default logsRouter;