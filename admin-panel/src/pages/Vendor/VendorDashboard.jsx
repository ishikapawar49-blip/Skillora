import "./VendorDashboard.css";
import {
  DollarSign,
  CalendarCheck,
  Star,
  TrendingUp,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const earningsData = [
  { month: "Jul", earnings: 1200 },
  { month: "Aug", earnings: 1800 },
  { month: "Sep", earnings: 2200 },
  { month: "Oct", earnings: 1900 },
  { month: "Nov", earnings: 2800 },
  { month: "Dec", earnings: 3100 },
];

const recentBookings = [
  { customer: "Sarah Johnson", service: "Hair Styling · Dec 15", amount: "$50", status: "completed" },
  { customer: "Mike Chen", service: "Makeup Session · Dec 16", amount: "$75", status: "pending" },
  { customer: "Emma Wilson", service: "Hair Coloring · Dec 17", amount: "$120", status: "pending" },
  { customer: "James Brown", service: "Hair Styling · Dec 18", amount: "$50", status: "completed" },
];

export default function VendorDashboard() {
  return (
    <div className="vdash-container">

      {/* HEADER */}
      <div className="vdash-header">
        <h1>Dashboard</h1>
        <p>Welcome back, Maria! Here's your overview.</p>
      </div>

      {/* STATS */}
      <div className="vdash-stats">
        <div className="vdash-card gradient">
          <div className="vdash-icon"><DollarSign size={18} /></div>
          <p>Total Earnings</p>
          <h2>$12,480</h2>
          <span>+18% this month</span>
        </div>

        <div className="vdash-card">
          <div className="vdash-icon light"><CalendarCheck size={18} /></div>
          <p>Active Bookings</p>
          <h2>24</h2>
          <span className="vdash-green">+5 new today</span>
        </div>

        <div className="vdash-card">
          <div className="vdash-icon light"><Star size={18} /></div>
          <p>Average Rating</p>
          <h2>4.8</h2>
          <span>Based on 156 reviews</span>
        </div>

        <div className="vdash-card">
          <div className="vdash-icon light"><TrendingUp size={18} /></div>
          <p>This Month</p>
          <h2>$3,100</h2>
          <span className="green">+12% vs last month</span>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="vdash-bottom">
   
        {/* ✅ CHART (REPLACED) */}
        <div className="vdash-box">
          <h3>Earnings Overview</h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={earningsData} barCategoryGap="25%">

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />

              <Bar
                dataKey="earnings"
                radius={[8, 8, 0, 0]}
                fill="url(#gradient)"
              />

              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>

            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* BOOKINGS */}
        <div className="vdash-box">
          <h3>Recent Bookings</h3>

          {recentBookings.map((b, i) => (
            <div key={i} className="vdash-booking">
              <div>
                <p className="vdash-name">{b.customer}</p>
                <p className="vdash-sub">{b.service}</p>
              </div>

              <div className="vdash-right">
                <span className="vdash-amt">{b.amount}</span>
                <span className={`badge ${b.status}`}>
                  {b.status}
                </span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}