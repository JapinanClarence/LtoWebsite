import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import http from "http"; 

//routes
import driverRoutes from "./routes/driver.js";
import authRoutes from "./routes/auth.js";
import vehicleRoutes from "./routes/vehicle.js";

const app = express();
const server = http.createServer(app); 

//server port
const PORT = process.env.PORT;

mongoose
.connect(process.env.DATABASE_LOCAL)
.then(() => {
  console.log("Local DB connected successfully");
})
.catch((err) => {
  console.error("DB connection error:", err);
});


//driver route
app.use("/api/driver/", driverRoutes);
app.use("/api/vehicle", vehicleRoutes);

app.use("/api/auth/", authRoutes);

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
