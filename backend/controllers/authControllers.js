const user = require("../models/userModels");
// const user = require("../models/userModels");

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
    const User = await user.create({
      userName,
      email,
      password,
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
        const {email, password} = req.body
        //validation
        if (!email || !password) {
            return res.status(404).json({
                status: false,
                message: 'email or password incorrect'
            })
        }
        // check user
        const findUser = await user.findOne({email: email, password: password})
        if(!findUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        res.status(200).json({
            status: true,
            message: 'Login successfully'
        })

    }catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: false,
            message: 'error while loggin '
        })
    }

}

module.exports = { registerController, loginController };
