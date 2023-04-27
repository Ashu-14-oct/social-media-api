const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
  ],
  followingCount: {
    type: Number,
    default: 0,
  },
  followersCount: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
