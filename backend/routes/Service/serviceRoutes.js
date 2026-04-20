import express from "express";
import Service from "../../models/Service/Service.js";
import { getAllServices } from "../../controllers/Service/serviceController.js";
const router = express.Router();

// ✅ GET ALL SERVICES (with optional vendor/category filters)
router.get("/", getAllServices);


// ✅ POPULAR SERVICES (1 per category)
router.get("/popular", async (req, res) => {
  try {
    const categories = ["Cleaning", "Beauty", "Electrical", "Plumbing"];

    const services = await Promise.all(
      categories.map(async (cat) => {
        return await Service.findOne({ category: cat }).sort({ createdAt: -1 });
      })
    );

    res.json(services.filter(Boolean)); // remove null
  } catch (err) {
    res.status(500).json({ message: "Error fetching popular services" });
  }
});


// ✅ GET CATEGORY COUNTS
router.get("/category-counts", async (req, res) => {
  try {
    const counts = await Service.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(counts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category counts" });
  }
});


export default router;