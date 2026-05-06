import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
    phone: {
    type: String,
    default: ""
  },

  image: {
  type: String,
},

  address: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    default: "active",
  },
  
   location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [lng, lat]
    }
  },

  city: {
    type: String,
    default: ""
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);