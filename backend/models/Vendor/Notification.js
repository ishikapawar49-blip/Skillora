import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },

    type: {
      type: String,
      enum: ["booking", "payment", "payout", "review", "service"],
    },

    title: String,
    message: String,

    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);