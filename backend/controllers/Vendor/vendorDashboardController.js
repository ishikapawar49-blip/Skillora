import Booking from "../../models/Booking/Booking.js";
import Review from "../../models/User/Review.js";
import Vendor from "../../models/Vendor/Vendor.js"; // 🔥 TOP me add

export const getVendorDashboard = async (req, res) => {
  try {
    const vendorId = req.vendor._id;
    const vendor = req.vendor;

    // 🔹 ALL BOOKINGS
    const bookings = await Booking.find({ vendor: vendorId })
      .populate("user", "name")
      .populate("service", "title");

    // 🔹 TOTAL EARNINGS
    const totalEarnings = bookings.reduce((acc, b) => acc + b.amount, 0);

    // 🔹 THIS MONTH EARNINGS
    const now = new Date();
    const thisMonthBookings = bookings.filter(b => {
      const d = new Date(b.createdAt);
      return d.getMonth() === now.getMonth() &&
             d.getFullYear() === now.getFullYear();
    });

    const thisMonth = thisMonthBookings.reduce((acc, b) => acc + b.amount, 0);

    // 🔹 LAST MONTH EARNINGS
const lastMonthDate = new Date();
lastMonthDate.setMonth(now.getMonth() - 1);

const lastMonthBookings = bookings.filter(b => {
  const d = new Date(b.createdAt);
  return d.getMonth() === lastMonthDate.getMonth() &&
         d.getFullYear() === lastMonthDate.getFullYear();
});

const lastMonth = lastMonthBookings.reduce((acc, b) => acc + b.amount, 0);

// 🔹 GROWTH %
let growth = 0;

if (lastMonth === 0 && thisMonth > 0) {
  growth = 100; // 🔥 NEW BUSINESS GROWTH
} else if (lastMonth > 0) {
  growth = (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1);
}

    // 🔹 ACTIVE BOOKINGS
    const activeBookings = bookings.filter(b => b.status === "pending").length;

    // 🔹 REVIEWS
    const reviews = await Review.find({ vendor: vendorId });
    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    // 🔹 MONTHLY CHART DATA
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const monthlyData = months.map((m, i) => {
      const total = bookings
        .filter(b => new Date(b.createdAt).getMonth() === i)
        .reduce((acc, b) => acc + b.amount, 0);

      return { month: m, earnings: total };
    });

    // 🔹 TODAY BOOKINGS
    const today = new Date();

const todayBookings = bookings.filter(b => {
  const d = new Date(b.createdAt);
  return d.toDateString() === today.toDateString();
}).length;

    // 🔹 RECENT BOOKINGS
    const recentBookings = bookings
      .slice(-5)
      .reverse()
      .map(b => ({
        customer: b.user?.name,
        service: `${b.service?.title} · ${new Date(b.selectedDate).toDateString()}`,
        amount: `₹${b.amount}`,
        status: b.status,
      }));

    res.json({
  ownerName: vendor.ownerName,
  totalEarnings: totalEarnings || 0,
  thisMonth: thisMonth || 0,
  lastMonth: lastMonth || 0,
  growth: growth || 0,
  activeBookings: activeBookings || 0,
  todayBookings: todayBookings || 0,
  avgRating: avgRating || 0,
  totalReviews: reviews.length || 0,
  monthlyData: monthlyData || [],      // 🔥 MUST ARRAY
  recentBookings: recentBookings || [], // 🔥 MUST ARRAY
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

