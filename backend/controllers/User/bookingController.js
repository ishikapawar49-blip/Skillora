import Booking from "../../models/Booking/Booking.js";
import Service from "../../models/Service/Service.js";
import Notification from "../../models/Vendor/Notification.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { skilloraTemplate } from "../../utils/emailTemplate.js";
import Vendor from "../../models/Vendor/Vendor.js";

// ✅ CREATE BOOKING (UPDATED)
export const createBooking = async (req, res) => {
  try {
    const {
      serviceId,
      selectedDate,
      selectedTime,
      address,
      paymentId,
    } = req.body;

    // 🔍 get service
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // ✅ STEP 1: Find last booking number
const lastBooking = await Booking.findOne().sort({ bookingNumber: -1 });

// ✅ STEP 2: Generate new number
const newBookingNumber = lastBooking ? lastBooking.bookingNumber + 1 : 10001;

// ✅ STEP 3: Create booking with bookingNumber
const booking = await Booking.create({
  bookingNumber: newBookingNumber,   // 🔥 ADD THIS LINE

  user: req.user._id,
  vendor: service.vendor,
  service: service._id,
  selectedDate: new Date(selectedDate), // 🔥 FIX DATE
  selectedTime,
  address,
  paymentId,
  amount: service.price,
  paymentStatus: "paid",
  status: "pending", // 🔥 FIX STATUS (always start from pending)
});

// 🔥 CREATE NOTIFICATION FOR VENDOR
await Notification.create({
  vendor: service.vendor,
  type: "booking",
  title: "New Booking Request",
  message: `${req.user.name} booked ${service.title}`,
});

const vendor = await Vendor.findById(service.vendor);

if (vendor) {
  await sendEmail(
    vendor.email,
    "New Booking Received",
    skilloraTemplate(
      "New Booking",
      `${req.user.name} booked ${service.title}`
    )
  );
}

    // 🔥 populate service data
    const fullBooking = await Booking.findById(booking._id)
      .populate("service")
      .populate("user");

    res.status(201).json(fullBooking);

  } catch (error) {
    console.log("BOOKING ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET VENDOR BOOKINGS
export const getVendorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ vendor: req.user._id })
      .populate("service")
      .populate("user", "name");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

