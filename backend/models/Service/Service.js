import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    title: String,
    price: Number,
    category: String,
    description: String,
    duration: Number,

    // 🔥 NEW FIELDS
    image: {
      type: String,
      default: "/images/default.jpg",
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

// 🔥 AUTO SLUG GENERATE
serviceSchema.pre("save", async function () {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, "-");
  }
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;