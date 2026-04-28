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

amount: Number, // old support

serviceAmount: {
  type: Number,
  default: 0,
},

platformFee: {
  type: Number,
  default: 19,
},

totalAmount: {
  type: Number,
  default: 0,
},

vendorEarning: {
  type: Number,
  default: 0,
},

adminEarning: {
  type: Number,
  default: 0,
},

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