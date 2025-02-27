import mongoose from "mongoose";

/**
 * vehicle type:
 * 0= new
 * 1 = 2nd hand
 * 2= rebuilt
 * 3 = car
 * 4 = truck
 * 5 = hire
 * 6 = mo
 * 7 = to
 * 8= others
 *
 * fuel type:
 * 0 = gas
 * 1 = diesel
 * 2 = lpg
 * 3 = CNG
 * 4 = electric
 * 5 = others
 */

const encumbranceSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  middlename: { type: String },
  street: { type: String },
  barangay: { type: String },
  municipality: { type: String },
  province: { type: String },
});

const vehicleSchema = new mongoose.Schema(
  {
    plateNo: {
      type: String,
      required: [true, "plateNo is required"],
      unique: true,
    },
    fileNo: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "Drivers",
      required: true,
    },
    encumbrance: { type: encumbranceSchema },
    vehicleType: {
      type: String,
      enum: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
    },
    classification: {
      type: String,
      required: [true, "classification is required"],
    },
    make: {
      type: String,
      required: [true, "make is required"],
    },
    fuelType: {
      type: String,
      enum: ["0", "1", "2", "3", "4", "5", "6"],
    },
    motorNumber: {
      type: String,
      required: true,
      match: [/^[a-zA-Z0-9-]+$/, "Invalid motor number format"],
    },
    serialChassisNumber: {
      type: String,
      required: true,
      match: [/^[a-zA-Z0-9-]+$/, "Invalid chassis number format"],
    },
    series: { type: String, required: true, trim: true },
    bodyType: { type: String, required: true, trim: true },
    color: {
      type: String,
      required: [true, "color is required"],
    },
    yearModel: {
      type: Number,
      required: [true, "yearModel is required"],
      min: 1900, // Ensures valid year
    },
    dateRegistered: {
      type: Date,
      required: [true, "dateRegistered is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Registration date cannot be in the future.",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Enable virtuals in JSON response
    toObject: { virtuals: true }, // Enable virtuals when using .toObject()
  }
);

vehicleSchema.index({ owner: 1 });

//return driver details
vehicleSchema.virtual("driverDetails", {
  ref: "Drivers",
  localField: "owner",
  foreignField: "_id",
  justOne: true,
});

const VehicleModel = mongoose.model("Vehicles", vehicleSchema);

export default VehicleModel;
