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
