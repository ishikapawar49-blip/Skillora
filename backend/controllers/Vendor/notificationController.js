import Notification from "../../models/Vendor/Notification.js";

export const getVendorNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      vendor: req.vendor._id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { vendor: req.vendor._id },
      { read: true }
    );

    res.json({ message: "All marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET UNREAD COUNT in notification bell
// export const getUnreadCount = async (req, res) => {
//   try {
//     const count = await Notification.countDocuments({
//       vendor: req.vendor._id,
//       read: false,
//     });

//     res.json({ count });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };