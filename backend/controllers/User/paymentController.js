import razorpay from "../../config/razorpay.js";
import crypto from "crypto";
import Notification from "../../models/Vendor/Notification.js";
import Booking from "../../models/Booking/Booking.js";
import Service from "../../models/Service/Service.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { skilloraTemplate } from "../../utils/emailTemplate.js";
import Vendor from "../../models/Vendor/Vendor.js";
import { createNotification } from "../Admin/notificationController.js";

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert ₹ to paise
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// ✅ VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }

  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};