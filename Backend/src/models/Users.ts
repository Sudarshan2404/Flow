import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avtar: {
    type: String,
  },
  createdat: {
    type: Date,
    default: Date.now(),
  },
});

export const User = mongoose.model("User", Userschema);
