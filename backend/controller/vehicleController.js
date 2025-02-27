import VehicleModel from "../model/VehicleModel.js";
import UserModel from "../model/UserModel.js";
import DriverModel from "../model/DriverModel.js";

export const createVehicle = async (req, res) => {
  const ownerId = req.body.owner;
  const plateNo = req.body.plateNo;
  try {
    const driverExists = await DriverModel.findById(ownerId);
    const plateNoTaken = await VehicleModel.findOne({ plateNo });

    if (!driverExists) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (plateNoTaken) {
      return res.status(400).json({
        success: false,
        message: "Vehicle already registered",
      });
    }

    await VehicleModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle registered",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getVehicle = async (req, res) => {
  try {
    const vehicles = await VehicleModel.find().populate({
      path: "driverDetails",
      select: "fullname firstName middleName lastName _id",
    });

    const vehicleDetails = vehicles.map((data) => {
      return {
        _id: data._id,
        owner: {
          _id: data.driverDetails._id,
          fullName: data.driverDetails.fullname,
        },
        vehicleType: data.vehicleType,
        classification: data.classification,
        make: data.make,
        fuelType: data.fuelType,
        series: data.series,
        bodyType: data.bodyType,
        series: data.series,
        color: data.color,
        yearModel: data.yearModel,
        dateRegistered: data.dateRegistered,
      };
    });

    res.status(200).json({
      success: true,
      data: vehicleDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
