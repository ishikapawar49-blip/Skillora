import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
    phone: {
    type: String,
    default: ""
  },

  address: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    default: "active",
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);