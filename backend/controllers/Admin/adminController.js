import Admin from "../../models/Admin/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/User/User.js";
import Vendor from "../../models/Vendor/Vendor.js";
import Booking from "../../models/Booking/Booking.js";
import Service from "../../models/Service/Service.js"; // 🔥 ADD TOP
import AdminPayout from "../../models/Admin/AdminPayout.js";
import Review from "../../models/User/Review.js";


// 🔐 Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ✅ REGISTER ADMIN (only once)
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET DASHBOARD STATS

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVendors = await Vendor.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // dummy revenue (baad me real karenge)
    const revenue = totalBookings * 100;

    res.json({
      totalUsers,
      totalVendors,
      totalBookings,
      revenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    const usersWithBookings = await Promise.all(
      users.map(async (user) => {
        const bookingCount = await Booking.countDocuments({
          user: user._id,
        });

        return {
          ...user._doc,
          bookings: bookingCount,
        };
      })
    );

    res.json(usersWithBookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL VENDORS
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });

    // 🔥 Add service count
    const vendorsWithServices = await Promise.all(
      vendors.map(async (v) => {
        const serviceCount = await Service.countDocuments({
          vendor: v._id,
        });

        return {
          ...v._doc,
          services: serviceCount,
        };
      })
    );

    res.json(vendorsWithServices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ APPROVE VENDOR
export const approveVendor = async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);

  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  vendor.status = "approved"; // ✅ change
  await vendor.save();

  res.json({ message: "Vendor approved" });
};

// REJECT VENDOR
export const rejectVendor = async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);

  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  vendor.status = "rejected"; 
  await vendor.save();

  res.json({ message: "Vendor rejected" });
};

// ✅ VIEW SINGLE USER
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookingCount = await Booking.countDocuments({
      user: user._id,
    });

    res.json({
      ...user._doc,
      bookings: bookingCount,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ BLOCK USER
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status =
      user.status === "active" ? "blocked" : "active";

    await user.save();

    res.json({
      message: `User ${user.status}`,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ DELETE USER
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    await Booking.deleteMany({
      user: req.params.id,
    });

    res.json({
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ MAKE USER ACTIVE
export const makeUserActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "active";
    await user.save();

    res.json({ message: "User Activated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL BOOKINGS
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("vendor", "name businessName email")
      .populate("service", "title price")
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET PAYMENTS PAGE DATA
export const getAdminPayments = async (req, res) => {
  try {

    const bookings = await Booking.find({ paymentStatus: "paid" })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const totalRevenue = bookings.reduce(
      (sum, item) => sum + (item.adminEarning || 0),
      0
    );

    const now = new Date();

    const thisMonthRevenue = bookings
      .filter((b) => {
        const d = new Date(b.createdAt);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, item) => sum + (item.adminEarning || 0), 0);

    const payouts = await AdminPayout.find();

    const withdrawn = payouts.reduce(
      (sum, p) => sum + p.amount,
      0
    );

    const availableBalance = totalRevenue - withdrawn;

    // CHART DATA
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const revenueData = months.map((m, i) => {
      const monthly = bookings
        .filter((b) => new Date(b.createdAt).getMonth() === i)
        .reduce((sum, item) => sum + (item.adminEarning || 0), 0);

      return {
        month: m,
        revenue: monthly,
      };
    });

    // TABLE DATA
    const transactions = payouts
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .map((p, index) => ({
    id: `WDL-${1000 + index}`,
    user: "Admin",
    type: "Withdraw",
    amount: p.amount,
    date: p.createdAt,
    status: p.status || "completed",
  }));


    res.json({
      totalRevenue,
      thisMonthRevenue,
      totalTransactions: transactions.length,
      availableBalance,
      revenueData,
      transactions,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// WITHDRAW
export const withdrawAdminAmount = async (req, res) => {
  try {

    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success:false,
        message:"Invalid amount"
      });
    }

    await AdminPayout.create({
      amount,
      status:"completed",
      note:"Admin withdrew amount"
    });

    res.json({
      success:true,
      message:"Withdraw successful"
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

// GET ALL REVIEWS
export const getAllReviews = async (req, res) => {
  try {

    const reviews = await Review.find()
      .populate("user", "name")
      .populate("vendor", "businessName name")
      .populate("service", "title")
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE REVIEW
export const deleteReviewByAdmin = async (req, res) => {
  try {

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Review removed",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
