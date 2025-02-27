import DriverModel from "../model/DriverModel.js";

export const createDriver = async (req, res) => {
  try {
    const driver = await DriverModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Driver registered successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getDrivers = async (req, res) => {
  try {
    const drivers = await DriverModel.find().lean();
    
    res.status(200).json({
      success: true,
      data: drivers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const findDriver = async (req, res) => {
  const driverId = req.params.id;
  try {
    const driver = await DriverModel.findById(driverId);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.status(200).json({
      success: true,
      data: driver,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateDriver = async (req, res) => {
  const driverId = req.params.id;
  try {
    const driver = await DriverModel.findByIdAndUpdate(driverId, req.body);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Driver updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deactivateDriver = async (req, res) => {
  const driverId = req.params.id;
  try {
    const driver = await DriverModel.findByIdAndUpdate(
      driverId,
      {
        isActive: false,
      },
      { new: true }
    );

    if(!driver){
      return res.status(404).json({
        success: false,
        message:"Driver not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Driver deactivated"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
