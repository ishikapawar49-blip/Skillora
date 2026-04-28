import mongoose from "mongoose";

const payoutSchema = new mongoose.Schema(
{
  amount: Number,
  status: {
    type: String,
    default: "completed",
  },
  note: String,
},
{ timestamps: true }
);

export default mongoose.model("AdminPayout", payoutSchema);

