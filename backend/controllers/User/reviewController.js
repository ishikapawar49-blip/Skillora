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

    // 🔥 1. Ishika ke reviews (4⭐ & 5⭐)
    const ishikaReviews = await Review.find({ rating: { $gte: 4 } })
      .populate("user", "name")
      .populate("service", "title")
      .sort({ createdAt: -1 });

    const ishikaFiltered = ishikaReviews
      .filter(r => r.user?.name === "Ishika Pawar")
      .slice(0, 2); // ✅ only 2

    // 🔥 2. Other users (exclude Ishika)
    const otherReviews = ishikaReviews
      .filter(r => r.user?.name !== "Ishika Pawar")
      .slice(0, 1); // ✅ only 1

    // 🔥 3. Combine
    const finalReviews = [...ishikaFiltered, ...otherReviews];

    res.json(finalReviews);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};