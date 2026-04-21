import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    phone: String,
    flat: String,
    locality: String,
    pincode: String,
    slug: String,
    selectedDate: Object,
    selectedTime: String,
  },
  { timestamps: true }
);

export default mongoose.model("Address", addressSchema);