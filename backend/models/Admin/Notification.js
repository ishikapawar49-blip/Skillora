import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: String,
    title: String,
    message: String,
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdminNotification", notificationSchema);