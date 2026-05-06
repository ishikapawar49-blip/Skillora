import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // USER INFO
    name: String,
    phone: String,

    // ADDRESS INFO
    flat: String,
    locality: String,
    pincode: String,

    // FULL ADDRESS
    fullAddress: String,

    // GEO LOCATION
    lat: Number,
    lng: Number,

    // HOME / OFFICE
    type: {
      type: String,
      default: "Home"
    },

    // EXTRA
    slug: String,
    selectedDate: Object,
    selectedTime: String,

  },
  { timestamps: true }
);

export default mongoose.model(
  "Address",
  addressSchema
);