import express from "express";
import {
  registerVendor,
  loginVendor,
  getVendorServices,
  deleteService,
  updateService,
  vendorDashboard,
  getVendorBookings,
  updateBookingStatus,
  getServiceBySlug,
  getVendorEarnings,
} from "../../controllers/Vendor/vendorController.js";
import Vendor from "../../models/Vendor/Vendor.js";
import { protectVendor } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/uploadMiddleware.js";
import Service from "../../models/Service/Service.js";

const router = express.Router();

// 🔓 PUBLIC ROUTES
router.post("/register", registerVendor);
router.post("/login", loginVendor);

// 🔐 ADD SERVICE (WITH IMAGE UPLOAD 🔥)
router.post(
  "/services",
  protectVendor,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const title = req.body.title;
      const price = req.body.price;
      const category = req.body.category;
      const description = req.body.description;
      const duration = req.body.duration;

      const service = await Service.create({
        vendor: req.vendor._id,
        title,
        price,
        category,
        description,
        duration,
        image: req.file ? req.file.path : "", // 🔥 Store Cloudinary URL
      });

      res.json(service);
    }catch (error) {
  console.log("🔥 REAL ERROR:", error); // 👈 IMPORTANT
  res.status(500).json({ message: error.message });
    }
  }
);


// 🔐 GET ALL VENDOR SERVICES
router.get("/services", protectVendor, getVendorServices);


// 🔐 DELETE SERVICE
router.delete("/services/:id", protectVendor, deleteService);


// 🔐 UPDATE SERVICE (WITHOUT IMAGE FOR NOW)
router.put(
  "/services/:id",
  protectVendor,
  upload.single("image"), // 🔥 ADD THIS
  updateService
);

// 🔐 BOOKINGS
router.get("/bookings", protectVendor, getVendorBookings);
// 🔥 UPDATE BOOKING STATUS
router.put("/booking/:id/status", protectVendor, updateBookingStatus);

// 🔐 DASHBOARD
router.get("/dashboard", protectVendor, vendorDashboard);

// 🔓 GET SERVICE BY SLUG (PUBLIC)
router.get("/services/slug/:slug", getServiceBySlug);

// ✅ GET PROFILE
router.get("/profile", protectVendor, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor._id);
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// ✅ UPDATE PROFILE
router.put("/profile", protectVendor, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor._id);

    vendor.businessName = req.body.businessName;
    vendor.bio = req.body.bio;
    vendor.address = req.body.address;
    vendor.phone = req.body.phone; // ✅ editable

    // ❌ NOT editable
    // vendor.ownerName ❌
    // vendor.email ❌

    if (req.body.profileImage) {
      vendor.profileImage = req.body.profileImage;
    }

    await vendor.save();

    res.json(vendor);

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});


// ✅ UPLOAD PROFILE IMAGE
router.post(
  "/upload-image",
  protectVendor,
  upload.single("image"),
  async (req, res) => {
    try {
      const vendor = await Vendor.findById(req.vendor._id);

      vendor.profileImage = req.file.path;

      await vendor.save();

      res.json({ url: req.file.path });

    } catch (err) {
      res.status(500).json({ message: "Image upload failed" });
    }
  }
);


// ✅ UPLOAD DOCUMENTS
router.post(
  "/upload-docs",
  protectVendor,
  upload.array("documents"),
  async (req, res) => {
    try {
      const vendor = await Vendor.findById(req.vendor._id);

      const docs = req.files.map((file) => ({
        name: file.originalname,
        url: file.path,
      }));

      vendor.documents = [...vendor.documents, ...docs];

      await vendor.save();

      res.json({ documents: vendor.documents });

    } catch (err) {
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

// ❌ DELETE DOCUMENT
router.delete("/document/:docId", protectVendor, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor._id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    console.log("Before:", vendor.documents);

    // 🔥 IMPORTANT FIX (string compare)
    vendor.documents = vendor.documents.filter(
      (doc) => doc._id.toString() !== req.params.docId
    );

    await vendor.save();

    console.log("After:", vendor.documents);

    res.json({
      success: true,
      documents: vendor.documents
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

// ✅ GET ALL APPROVED VENDORS (FOR PROFESSIONALS PAGE)
router.get("/all", async (req, res) => {
  try {
    const vendors = await Vendor.find({ status: "approved" });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching vendors" });
  }
});



// ✅ GET EARNINGS & STATS
router.get("/earnings", protectVendor, getVendorEarnings);
export default router;