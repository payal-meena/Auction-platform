// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   skillknow: [String],
//   skilllearn: [String],


// });

// const User = mongoose.model("User", userSchema);
// export default User;
// import mongoose from "mongoose";
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // e.g. React, Guitar
    },
    // level future me add kar sakti ho
    // level: {
    //   type: String,
    //   enum: ["Beginner", "Intermediate", "Advanced"],
    // },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    /* Skills */
    skillsOffered: [skillSchema],
    skillsToLearn: [skillSchema],

    /* Profile Info */
    bio: {
      type: String,
      maxlength: 300,
    },

    location: {
      type: String,
    },

    profileImage: {
      type: String, // Cloudinary / Firebase URL
    },

    /* Ratings */
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    /* Account Status */
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
