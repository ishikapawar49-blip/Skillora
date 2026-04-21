import Vendor from "../../models/Vendor/Vendor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Service from "../../models/Service/Service.js";
import Booking from "../../models/Booking/Booking.js";
import Payout from "../../models/Vendor/Payout.js";
import Notification from "../../models/Vendor/Notification.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { skilloraTemplate } from "../../utils/emailTemplate.js";

// 🔐 TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ✅ REGISTER VENDOR
export const registerVendor = async (req, res) => {
   const { ownerName, email, password, phone } = req.body;

  try {
    const vendorExists = await Vendor.findOne({ email });

    if (vendorExists) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


const vendor = await Vendor.create({
  ownerName,
  email,
  password: hashedPassword,
  phone,
  status: "pending",
});
    res.status(201).json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      token: generateToken(vendor._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOGIN
export const loginVendor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔥 IMPORTANT FIX
    if (vendor.status !== "approved") {
      return res.status(401).json({
        message: "Admin approval pending",
      });
    }

    res.json({
      _id: vendor._id,
      ownerName: vendor.ownerName,
      email: vendor.email,
      token: generateToken(vendor._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADD SERVICE
export const addService = async (req, res) => {
  try {
    const { title, price, category, description, duration } = req.body;

    console.log("VENDOR:", req.vendor); // debug
    console.log("BODY:", req.body);     // debug

    const service = await Service.create({
      vendor: req.vendor._id,
      title,
      price,
      category,
      description,
      duration,
    });

    // ✅ ADD HERE
    await Notification.create({
      vendor: req.vendor._id,
      type: "service",
      title: "Service Added",
      message: `${service.title} added successfully`,
    });

    await sendEmail(
  req.vendor.email,
  "Service Added",
  skilloraTemplate(
    "Service Added",
    `${service.title} added successfully`
  )
);

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET MY SERVICES
export const getVendorServices = async (req, res) => {
  const services = await Service.find({ vendor: req.vendor._id });

  res.json(services);
};


// ✅ DELETE SERVICE
export const deleteService = async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  // 🔥 IMPORTANT SECURITY CHECK
  if (service.vendor.toString() !== req.vendor._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await service.deleteOne();

  res.json({ message: "Service deleted" });
};

// ✅ UPDATE SERVICE
export const updateService = async (req, res) => {
  try {
    const { title, price, category, description, duration } = req.body;

    const updateData = {
      title,
      price,
      category,
      description,
      duration,
    };

    // 🔥 अगर नई image आई है
    if (req.file) {
      updateData.image = req.file.path;
    }

    const service = await Service.findOneAndUpdate(
      {
        _id: req.params.id,
        vendor: req.vendor._id,
      },
      updateData,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found or not authorized",
      });
    }

    res.json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ DASHBOARD
export const vendorDashboard = async (req, res) => {
  const totalServices = await Service.countDocuments({
    vendor: req.vendor._id,
  });

  res.json({ totalServices });
};


// ✅ GET BOOKINGS FOR VENDOR
export const getVendorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      vendor: req.vendor._id,
    })
      .populate("user", "name email")
      .populate("service", "title price")
      .sort({ createdAt: -1 }); // 🔥 latest first

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATE BOOKING STATUS
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ❌ already completed / cancelled → lock
    if (booking.status === "completed" || booking.status === "cancelled") {
      return res.status(400).json({ message: "Already finalized" });
    }

    // ✅ flow control
    if (booking.status === "pending" && status === "confirmed") {
      booking.status = "confirmed";
    } 
    else if (booking.status === "confirmed" && status === "completed") {
      booking.status = "completed";
    } 
    else if (
  (booking.status === "pending" || booking.status === "confirmed") &&
  status === "cancelled"
) {
  booking.status = "cancelled";
}
    else {
      return res.status(400).json({ message: "Invalid status change" });
    }

    await booking.save();

    res.json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET SERVICE BY SLUG
export const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET EARNINGS & STATS

export const getVendorEarnings = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    const bookings = await Booking.find({ vendor: vendorId });

    const payouts = await Payout.find({ vendor: vendorId });

    // ✅ TOTAL EARNINGS (only completed)
    const totalEarnings = bookings
      .filter(b => b.status === "completed")
      .reduce((acc, b) => acc + b.amount, 0);

    // ✅ THIS MONTH
    const thisMonth = bookings
      .filter(b => {
        const d = new Date(b.createdAt);
        const now = new Date();
        return (
          b.status === "completed" &&
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((acc, b) => acc + b.amount, 0);

    // ✅ TOTAL WITHDRAWN
    const totalWithdrawn = payouts
      .filter(p => p.status === "completed")
      .reduce((acc, p) => acc + p.amount, 0);

    const availableBalance = totalEarnings - totalWithdrawn;

    // ✅ CHART DATA (monthly)
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const chart = months.map((m, i) => {
      const earnings = bookings
        .filter(b => {
          const d = new Date(b.createdAt);
          return b.status === "completed" && d.getMonth() === i;
        })
        .reduce((acc, b) => acc + b.amount, 0);

      return { month: m, earnings };
    });

    res.json({
      stats: {
        totalEarnings,
        thisMonth,
        availableBalance,
        totalWithdrawn,
      },
      chart,
      payouts,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ CREATE WITHDRAW REQUEST
export const createWithdrawRequest = async (req, res) => {
  try {
    const vendorId = req.vendor._id;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // get earnings
    const bookings = await Booking.find({ vendor: vendorId });
    const payouts = await Payout.find({ vendor: vendorId });

    const totalEarnings = bookings
      .filter(b => b.status === "completed")
      .reduce((acc, b) => acc + b.amount, 0);

    const totalWithdrawn = payouts
      .filter(p => p.status === "completed")
      .reduce((acc, p) => acc + p.amount, 0);

    const availableBalance = totalEarnings - totalWithdrawn;

    if (amount > availableBalance) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

// 🔥 GET LAST PAYOUT
const lastPayout = await Payout.findOne().sort({ createdAt: -1 });

// 🔥 GENERATE NEXT ID
let nextNumber = 10001;

if (lastPayout && lastPayout.payoutId) {
  const lastNumber = parseInt(lastPayout.payoutId.split("-")[1]);
  nextNumber = lastNumber + 1;
}

const payoutId = `WT-${nextNumber}`;

// 🔥 CREATE PAYOUT
const payout = await Payout.create({
  vendor: vendorId,
  amount,
  status: "completed",
  method: "bank",
  date: new Date(),
  payoutId, // ✅ IMPORTANT
});

await Notification.create({
  vendor: vendorId,
  type: "payout",
  title: "Payout Processed",
  message: `Withdrawal processed successfully`,
});

await sendEmail(
  req.vendor.email,
  "Payout Processed",
  skilloraTemplate(
    "Payout Processed",
    `₹${amount} withdrawal processed successfully`
  )
);

    res.json({ message: "Withdraw request sent", payout });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET VENDOR PROFILE
export const getVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor._id).select("-password");
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVendorNotifications = async (req, res) => {
  const vendorId = req.vendor._id;

  const notifications = await Notification.find({ vendor: vendorId })
    .sort({ createdAt: -1 });

  res.json(notifications);
};