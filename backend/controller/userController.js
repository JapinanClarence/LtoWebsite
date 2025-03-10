import UserModel from "../model/UserModel.js";

export const findUser = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await UserModel.findById(userId);
    console.log(user, userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
