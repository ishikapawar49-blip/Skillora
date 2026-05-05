import Booking from "../../models/Booking/Booking.js";  
import Review from "../../models/User/Review.js";     
import Notification from "../../models/Vendor/Notification.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { skilloraTemplate } from "../../utils/emailTemplate.js";
import Vendor from "../../models/Vendor/Vendor.js";
import { createNotification } from "../Admin/notificationController.js";


export const createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const review = await Review.create({
      user: req.user?._id || null,
      vendor: booking.vendor,
      service: booking.service,
      booking: bookingId,
      rating,
      comment,
    });

    // ✅ get notifications for vendor ratings
await Notification.create({
  vendor: booking.vendor,
  type: "review",
  title: "New Review",
  message: `New ${rating}-star review received`,
});

const vendor = await Vendor.findById(booking.vendor);

if (vendor) {
  await sendEmail(
    vendor.email,
    "New Review Received",
    skilloraTemplate(
      "New Review",
      `You received ${rating}-star rating`
    )
  );
}
await createNotification(
  "alert",
  "New Review",
  `New ${rating}-star review submitted`
);

    res.json(review);


  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate("booking");

    res.json(reviews);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVendorReviews = async (req, res) => {
  try {
    const vendorId = req.vendor._id; // ✅ FIX

    const reviews = await Review.find({ vendor: vendorId })
      .populate("user", "name")
      .populate("service", "title")
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (err) {
    console.log("🔥 ERROR:", err); // ADD THIS
    res.status(500).json({ message: err.message });
  }
};


export const getFeaturedTestimonials = async (req, res) => {
  try {

    const reviews = await Review.find({ rating: { $gte: 4 } })
      .populate("user", "name")
      .populate("service", "title")
      .sort({ createdAt: -1 });

    // 🔥 1. Ishika specific services
const bridal = reviews.find(
  r =>
    r.user?.name === "Ishika Pawar" &&
    r.service?.title?.toLowerCase().includes("bridal")
);

const interior = reviews.find(
  r =>
    r.user?.name === "Ishika Pawar" &&
    r.service?.title?.toLowerCase().includes("interior")
);

const cleaning = reviews.find(
  r =>
    r.user?.name === "Ishika Pawar" &&
    r.service?.title?.toLowerCase().includes("cleaning")
);

    // 🔥 2. Other user (exclude Ishika)
    const other = reviews.find(
      r => r.user?.name !== "Ishika Pawar"
    );

    // 🔥 3. Final ordered array
    const finalReviews = [
      bridal,
      other,
      interior,
      cleaning
    ].filter(Boolean); // remove null

    res.json(finalReviews);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};