import express from "express";
import Booking from "../../models/Booking/Booking.js";
import { protectUser } from "../../middleware/authMiddleware.js";
import protectVendor from "../../middleware/vendorMiddleware.js";
import { createBooking, getVendorBookings } from "../../controllers/User/bookingController.js";
const router = express.Router();

// ✅ MY BOOKINGS
router.get("/my-bookings", protectUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("service")   // 🔥 VERY IMPORTANT
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

// ✅ CREATE BOOKING
router.post("/", protectUser, createBooking);

// ✅ VENDOR BOOKINGS
router.get("/vendor-bookings", protectVendor, getVendorBookings);

// ✅ GET BOOKING BY ID
router.get("/:id", protectUser, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("service");

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error fetching booking" });
  }
});


export default router;