import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/Admin/adminRoutes.js";
import userRoutes from "./routes/User/userRoutes.js";
import vendorRoutes from "./routes/Vendor/vendorRoutes.js";
import bookingRoutes from "./routes/Booking/bookingRoutes.js";
import serviceRoutes from "./routes/Service/serviceRoutes.js";
import paymentRoutes from "./routes/User/paymentRoutes.js";
import wishlistRoutes from "./routes/User/wishlistRoutes.js";
// import { sendEmail } from "./utils/sendEmail.js";

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/vendor", vendorRoutes); 
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/wishlist", wishlistRoutes);

// ✅ 🔥 ADD THIS HERE (EXACTLY HERE)
// sendEmail(
//   "ishikapawar49@gmail.com",
//   "TEST EMAIL",
//   "<h1>Hello Ishika 🚀 Skillora working!</h1>"
// );
// console.log("EMAIL:", process.env.EMAIL_USER);
// console.log("PASS:", process.env.EMAIL_PASS);

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});