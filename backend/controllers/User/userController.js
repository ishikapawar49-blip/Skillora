import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User/User.js";
import Booking from "../../models/Booking/Booking.js";
import Address from "../../models/User/Address.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};



// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Boooking a service
export const createBooking = async (req, res) => {
  try {
    const { serviceId, date, time } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      vendor: req.body.vendorId,
      service: serviceId,
      date,
      time,
      amount: req.body.amount,
      paymentStatus: "paid", // 🔥 for now
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER ADDRESS
export const getUserAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ user: req.user._id }).sort({ createdAt: -1 });

    res.json(address || {});
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Save user address
export const saveAddress = async (req, res) => {
  try {
    const address = await Address.create({
      user: req.user._id,
      ...req.body,
    });

    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

