const user = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// registern controller
const registerController = async (req, res) => {
  try {
    const { userName, email, password, Phone, address, Profile, userType } =
      req.body;
    console.log(req.body);
    // validation
    if (!userName || !email || !password || !Phone || !userType) {
      console.log(
        "🚀 ~ registerController ~ (!userName|| !email || !password || !Phone || Profile):",
        !userName || !email || !password || !Phone || Profile
      );
      return res.status({
        status: false,
        message: "Please Provide All Fields",
      });
    }
    const exisitng = await user.findOne({ email });
    if (exisitng) {
      return res.status(500).json({
        status: false,
        message: "User with this email is already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await user.create({
      userName,
      email,
      password: hashedPassword,
      address,
      Phone,
      userType,
    });
    res.status(200).json({
      status: true,
      message: "user created with this these details",
      User,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error In Register API",
      error,
    });
    console.log(error.message);
  }
};
// Login route

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      res.status(404).json({
        status: false,
        message: "email or password incorrect",
      });
      return;
    }
    // check user
    const findUser = await user.findOne({ email: email });
    if (!findUser) {
      res.status(404).json({
        success: false,
        message: "Email or password mismatched",
      });
      return;
    }

    // check password
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      res.status(500).json({
        status: false,
        message: "Incorrect Password",
      });
      return;
    }
    // Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("🚀 ~ loginController ~ token:", token);
    findUser.password = undefined;
    res.status(200).json({
      status: true,
      message: "Login successfully",
      token,
      findUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: "error while loggin ",
    });
    return;
  }
};

module.exports = { registerController, loginController };
