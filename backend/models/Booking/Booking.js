import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {   
      type: Number,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },

    // ✅ NEW FIELDS
    selectedDate: {
  type: Date,
  required: true,
},
    selectedTime: String,

    address: {
      name: String,
      phone: String,
      flat: String,
      locality: String,
      pincode: String,
    },

    paymentId: String,

    amount: Number,

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);