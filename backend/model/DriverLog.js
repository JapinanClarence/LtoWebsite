import mongoose from "mongoose";

const driverLogSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        required: true,
      },
      activityType: {
        type: String,
        enum: ["Vehicle Registered", "Violation Received", "Accident Involved"],
        required: true,
      },
      relatedEntity: {
        entityId: mongoose.Schema.Types.ObjectId, // Reference to vehicle, violation, or accident
        entityType: {
          type: String,
          enum: ["Vehicle", "Violation", "Accident"],
        },
      },
      details: {
        type: String, // Additional details (e.g., "Registered Toyota Hilux 2023")
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})

export default mongoose.model("DriverLog", driverLogSchema);