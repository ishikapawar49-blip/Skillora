import express from "express";
import { getAllUsers, registerUser, loginUser, getUserAddress, saveAddress,} from "../../controllers/User/userController.js";
import { createBooking } from "../../controllers/User/bookingController.js";
import protect, { protectUser } from "../../middleware/authMiddleware.js";
import { createReview, getMyReviews } from "../../controllers/User/reviewController.js";

const router = express.Router();

// 🔥 ADMIN GET ALL USERS
router.get("/", protect, getAllUsers);

// 🔥 USER REGISTER & LOGIN
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔥 GET USER PROFILE
router.get("/profile", protectUser, (req, res) => {
  res.json(req.user);
});

// 🔥 UPDATE USER PROFILE
router.put("/profile", protectUser, async (req, res) => {
  try {
    const user = req.user;

    // ❌ name & email update nahi karna
    // ✅ sirf phone & address update hoga

    if (req.body.phone !== undefined) {
      user.phone = req.body.phone;
    }

    if (req.body.address !== undefined) {
      user.address = req.body.address;
    }

    const updatedUser = await user.save();

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
});

// 🔐 CREATE BOOKING
router.post("/book", protectUser, createBooking);

// 🔐 GET ADDRESS
router.get("/address", protectUser, getUserAddress);

// 🔐 SAVE ADDRESS
router.post("/address", protectUser, saveAddress);

// 🔐 CREATE REVIEW
router.post("/reviews", protectUser, createReview);

// 
router.get("/reviews", protectUser, getMyReviews);

export default router;