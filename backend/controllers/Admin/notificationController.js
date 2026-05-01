import Notification from "../../models/Admin/Notification.js";
import { sendEmail } from "../../utils/sendEmail.js";

// 🔥 CREATE (important)
export const createNotification = async (type, title, message) => {
  const notification = await Notification.create({
    type,
    title,
    message,
  });

  // email
  await sendEmail(title, message);

  return notification;
};

// GET
export const getAdminNotifications = async (req, res) => {
  const data = await Notification.find().sort({ createdAt: -1 });
  res.json(data);
};

// MARK READ
export const markAllAdminRead = async (req, res) => {
  await Notification.updateMany({}, { read: true });
  res.json({ message: "All read" });
};