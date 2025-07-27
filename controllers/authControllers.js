const user = require("../models/userModels");
const bcrypt = require("bcryptjs"); // ✅ use bcryptjs for cross-platform reliability
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// ======================= REGISTER CONTROLLER =======================
const registerController = async (req, res) => {
  try {
    const { userName, email, password, Phone, address, Profile, userType } =
      req.body;

    // Validation
    if (!userName || !email || !password || !Phone || !userType) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if user exists
    const existing = await user.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await user.create({
      userName,
      email,
      password: hashedPassword,
      address,
      Phone,
      userType,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error during registration",
      error: error.message,
    });
  }
};

// ======================= LOGIN CONTROLLER =======================
// ======================= LOGIN CONTROLLER =======================
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    console.log("Existing User:", existingUser);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT (✅ embed user ID as 'id' for consistency with middleware)
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    console.log("Generated Token:", token);

    // Remove sensitive data before sending user object
    const { password: _, ...userData } = existingUser.toObject();

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error during login",
      error: error.message,
    });
  }
};

module.exports = { registerController, loginController };
