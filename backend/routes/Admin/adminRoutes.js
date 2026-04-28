import express from "express";
import {
 loginAdmin,
 registerAdmin,
 getDashboardStats,
 getAllUsers,
 getAllVendors,
 approveVendor,
 rejectVendor,
 getSingleUser,
 blockUser,
 deleteUser,
 makeUserActive,
 getAllBookings,
 getAdminPayments,
 withdrawAdminAmount, 
 getAllReviews,
 deleteReviewByAdmin
} from "../../controllers/Admin/adminController.js";
import protect from "../../middleware/authMiddleware.js";

const router = express.Router();

// routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/stats", protect, getDashboardStats);

// ✅ Users route (protected bhi karna better hai)
router.get("/users", protect, getAllUsers);

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome Admin Dashboard",
    admin: req.admin,
  });
});

// Vendor Management
router.get("/vendors", protect, getAllVendors);
router.put("/vendors/:id/approve", protect, approveVendor);
router.put("/vendors/:id/reject", protect, rejectVendor);

// User Management
router.get("/users/:id", protect, getSingleUser);
router.put("/users/:id/block", protect, blockUser);
router.delete("/users/:id", protect, deleteUser);
router.put("/users/:id/active", protect, makeUserActive);

// Bookings
router.get("/bookings", protect, getAllBookings);

// Payments
router.get("/payments", protect, getAdminPayments);
router.post("/payments/withdraw", protect, withdrawAdminAmount);

// Reviews
router.get("/reviews", protect, getAllReviews);
router.delete("/reviews/:id", protect, deleteReviewByAdmin);

export default router;
