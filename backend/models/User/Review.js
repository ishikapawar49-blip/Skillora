import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },

  rating: Number,
  comment: String,

}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);