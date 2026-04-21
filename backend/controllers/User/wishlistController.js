import Wishlist from "../../models/User/Wishlist.js";

// ✅ ADD / REMOVE
export const toggleWishlist = async (req, res) => {
  try {
    const { serviceId } = req.body;

    const existing = await Wishlist.findOne({
      user: req.user._id,
      service: serviceId,
    });

    // ❌ REMOVE
    if (existing) {
      await existing.deleteOne();
      return res.json({ message: "Removed from wishlist" });
    }

    // ✅ ADD
    const wishlist = await Wishlist.create({
      user: req.user._id,
      service: serviceId,
    });

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET USER WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user._id })
      .populate("service");

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};