const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: Array,
    },
    Phone_Number: {
      type: String,
      required: [true, "Phone_Number is required"],
    },
    userType: {
      type: String,
      required: [true, "userType is required"],
      enum: ["client", "admin", "driver"],
    },

    Profile: {
      type: String,

      default: "https://tinyurl.com/48xwj7ba",
    },
  },
  {
    timestamps: true, // ✅ this automatically adds createdAt and updatedAt
  }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
