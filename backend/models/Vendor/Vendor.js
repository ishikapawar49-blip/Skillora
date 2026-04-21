import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({

  // 🔐 BASIC (Register ke time)
  ownerName: { type: String, required: true },   // 👈 rename "name" → ownerName
  email: { type: String, required: true, unique: true },
  password: String,
  phone: String,

  // 🏢 BUSINESS INFO (Profile page pe add hoga)
  businessName: String,
  category: String,
  bio: String,
  address: String,

  // 🖼 PROFILE IMAGE
  profileImage: {
    type: String,
    default: "",
  },

  // 📄 DOCUMENTS
  documents: [
    {
      name: String,
      url: String,
    }
  ],

  // ✅ STATUS (Admin control)
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  }

}, { timestamps: true });

export default mongoose.model("Vendor", vendorSchema);