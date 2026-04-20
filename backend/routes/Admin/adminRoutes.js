import express from "express";
import { loginAdmin, registerAdmin, getDashboardStats, getAllUsers, getAllVendors, approveVendor,  rejectVendor, } from "../../controllers/Admin/adminController.js";

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
export default router;