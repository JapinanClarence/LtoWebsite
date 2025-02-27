import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    licenseNo: {
      type: String,
      required: [true, "licenseNo is required"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    middleName: {
      type: String,
    },
    street: {
      type: String,
      required: [true, "street is required"],
    },
    barangay: {
      type: String,
      required: [true, "barangay is required"],
    },
    municipality: {
      type: String,
      required: [true, "municipality is required"],
    },
    province: {
      type: String,
      required: [true, "province is required"],
    },
    zipCode: {
      type: String,
      required: [true, "zipCode is required"],
    },
    nationality: {
      type: String,
      required: [true, "nationality is required"],
    },
    sex: {
      type: String,
      enum: ["0", "1"],
      default: "0",
    },
    birthDate: {
      type: Date,
      required: [true, "birthDate is required"],
    },
    civilStatus: {
      type: String,
      enum: ["0", "1"],
      default: "0",
    },
    birthPlace: {
      type: String,
      required: [true, "birthPlace is required"],
    },
    issueDate: {
      type: Date,
      required: [true, "issueDate is required"],
    },
    expiryDate: {
      type: Date,
      required: [true, "expiryDate is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Enable virtuals in JSON response
    toObject: { virtuals: true }, // Enable virtuals when using .toObject()
  }
);

// Virtual for full name
driverSchema.virtual("fullname").get(function () {
  const middleInitial = this.middleName ? `${this.middleName.charAt(0)}. ` : "";
  return `${this.firstName} ${middleInitial}${this.lastName}`.trim();
});

const DriverModel = mongoose.model("Drivers", driverSchema);

export default DriverModel;
