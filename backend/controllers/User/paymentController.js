import razorpay from "../../config/razorpay.js";
import crypto from "crypto";
import Notification from "../../models/Vendor/Notification.js";
import Booking from "../../models/Booking/Booking.js";
import Service from "../../models/Service/Service.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { skilloraTemplate } from "../../utils/emailTemplate.js";
import Vendor from "../../models/Vendor/Vendor.js";

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
       const booking = await Booking.findOne({
    paymentId: razorpay_payment_id
  }).populate("service");

  if (booking) {
    await Notification.create({
      vendor: booking.vendor,
      type: "payment",
      title: "Payment Received",
      message: `Payment received for ${booking.service.title}`,
    });
  }

  if (booking) {
  const vendor = await Vendor.findById(booking.vendor);

  if (vendor) {
    await sendEmail(
      vendor.email,
      "Payment Received",
      skilloraTemplate(
        "Payment Received",
        `Payment received for ${booking.service.title}`
      )
    );
  }
}

      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};
