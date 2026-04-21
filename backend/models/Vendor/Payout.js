import mongoose from "mongoose";

const payoutSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  payoutId: {
  type: String,
  unique: true,
},
  amount: Number,
  method: String,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model("Payout", payoutSchema);




