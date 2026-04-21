import cron from "node-cron";
import Booking from "../models/Booking/Booking.js";
import Notification from "../models/Vendor/Notification.js";

export const startReminderJob = () => {
  cron.schedule("* * * * *", async () => {
    console.log("⏰ Checking reminders...");

    const now = new Date();

    const bookings = await Booking.find({
      status: "confirmed",
    }).populate("service vendor");

    bookings.forEach(async (b) => {
      const bookingTime = new Date(b.selectedDate);

      // 🔥 1 hour before
      const reminderTime = new Date(bookingTime.getTime() - 60 * 60 * 1000);

      // check if current time ~ reminder time
      const diff = Math.abs(now - reminderTime);

      if (diff < 60000) { // within 1 min window

        await Notification.create({
  vendor: b.vendor._id,
  type: "reminder",
  title: "Upcoming Service",
  message: `⏰ 1 hour baad "${b.service.title}" service hai`,
});

        console.log("✅ Reminder sent");
      }
    });
  });
};