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

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
  type: [Number],
  default: [0, 0]
}
  },

locality: {
    type: String,
    default: ""
  },

  city: {
    type: String,
    default: ""
  },

  pincode: {
    type: String,
    default: ""
  },

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

vendorSchema.index({
  location: "2dsphere"
});

export default mongoose.model("Vendor", vendorSchema);