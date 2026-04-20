import Admin from "../../models/Admin/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/User/User.js";
import Vendor from "../../models/Vendor/Vendor.js";
import Booking from "../../models/Booking/Booking.js";
import Service from "../../models/Service/Service.js"; // 🔥 ADD TOP


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

    res.json(users);
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