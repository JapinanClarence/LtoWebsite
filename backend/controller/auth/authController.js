import UserModel from "../../model/UserModel.js";
import jwt from "jsonwebtoken";

const ACCESS_KEY = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
const REFRESH_KEY = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;


export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message:
          userExists.username === username
            ? "Username already taken"
            : "Email already taken",
      });
    }

    await UserModel.create({
      username,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username is incorrect",
      });
    }

    //compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    //generate jwt token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      ACCESS_KEY,
      { expiresIn: ACCESS_EXPIRATION }
    );
    //generate refresh token
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_KEY, {
      expiresIn: REFRESH_EXPIRATION,
    });
    //store refresh token to cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const refreshAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  // Check if the refresh token exists
  if (!refreshToken) {
    const error = new Error("Refresh token required");
    error.status = 401;
    error.success = false;
    return next(error);
  }

  // Verify the refresh token
  jwt.verify(refreshToken, REFRESH_KEY, async (err, user, next) => {
    if (err) {
      const error = new Error("Invalid refresh token");
      error.status = 403;
      error.success = false;
      return next(error);
    }

    try {
      // Fetch user details using the user ID
      const currentUser = await UserModel.findById(user.userId);

      // If user is not found
      if (!currentUser) {
        const error = new Error("User not found");
        error.status = 404;
        error.success = false;
        return next(error);
      }

      // Generate a new access token with both id and email in the payload
      const newAccessToken = jwt.sign(
        {
          userId: currentUser._id,
          username: currentUser.username,
          role: currentUser.role,
        },
        ACCESS_KEY, //secret key
        { expiresIn: ACCESS_EXPIRATION } // Token expiration time
      );

      // Return the new access token
      return res.json({
        success: true,
        message: "Access token generated successfully",
        role: currentUser.role,
        token: newAccessToken,
      });
    } catch (err) {
      const error = new Error("Failed to refresh access token");
      error.status = 403;
      error.success = false;
      return next(error);
    }
  });
};
