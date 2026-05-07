import User from "../../models/User/User.js";
import Vendor from "../../models/Vendor/Vendor.js";
import Booking from "../../models/Booking/Booking.js";
import Service from "../../models/Service/Service.js";

export const getDashboardStats =
async (req, res) => {

try {


// TOTALS

const totalUsers =
await User.countDocuments();

const totalVendors =
await Vendor.countDocuments();

const totalBookings =
await Booking.countDocuments();


// REVENUE

const revenueData =
await Booking.find({
  paymentStatus: "paid",
});

const revenue =
revenueData.reduce(
(total, item) =>
total + (item.amount || 0),
0
);


// MONTHLY REVENUE

const monthlyRevenue =
await Booking.aggregate([

{
$match: {
paymentStatus: "paid",
},
},

{
$group: {

_id: {
$month: "$createdAt",
},

revenue: {
$sum: "$amount",
},

},
},

{
$sort: {
_id: 1,
},
},

]);


const monthNames = [
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec",
];

const revenueChart =
monthlyRevenue.map((item)=>({

month:
monthNames[item._id - 1],

revenue:
item.revenue,

}));


// WEEKLY BOOKINGS

const weeklyBookings =
await Booking.aggregate([

{
$group: {

_id: {
$dayOfWeek: "$createdAt",
},

bookings: {
$sum: 1,
},

},
},

{
$sort: {
_id: 1,
},
},

]);


const days = [
"Sun",
"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat",
];

const bookingChart =
weeklyBookings.map((item)=>({

day:
days[item._id - 1],

bookings:
item.bookings,

}));


// SERVICE CATEGORY

const categoryData =
await Service.aggregate([

{
$group: {

_id: "$category",

value: {
$sum: 1,
},

},
},

]);


const pieChart =
categoryData.map((item)=>({

name: item._id,

value: item.value,

}));


// RECENT ACTIVITY

const recentBookings =
await Booking.find()

.sort({ createdAt: -1 })

.limit(5)

.populate("user");


const activities =
recentBookings.map((item)=>({

text:
`${item.user?.name || "User"}
booked a service`,

}));


res.json({

totalUsers,

totalVendors,

totalBookings,

revenue,

revenueChart,

bookingChart,

pieChart,

activities,

});

} catch (err) {

console.log(err);

res.status(500).json({
message: "Dashboard error",
});

}

};