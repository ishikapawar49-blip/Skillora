import { useEffect, useState } from "react";
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


export default function VendorDashboard() {

const [data, setData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("vendorToken");

    const res = await fetch("http://localhost:5000/api/vendor/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const d = await res.json();
    console.log("API DATA 👉", d); 
    setData(d);
  };
  
  fetchData();
}, []);

if (!data) return <p>Loading...</p>;

  return (
    <div className="vdash-container">

      {/* HEADER */}
      <div className="vdash-header">
        <h1>Dashboard</h1>
      <p>
        Welcome back, {data.ownerName || "Vendor"}! Here's your overview.
      </p>
      </div>

      {/* STATS */}
      <div className="vdash-stats">
        <div className="vdash-card gradient">
          <div className="vdash-icon"><DollarSign size={18} /></div>
          <p>Total Earnings</p>
          <h2>₹{data.totalEarnings}</h2>
          <span className={data.growth >= 0 ? "vdash-green" : "vdash-red"}>
            {data.growth >= 0 ? "+" : ""}
            {data.growth}% this month
          </span>
        </div>

        <div className="vdash-card">
          <div className="vdash-icon light"><CalendarCheck size={18} /></div>
          <p>Active Bookings</p>
          <h2>{data.activeBookings}</h2>
          <span className="vdash-green">+{data.todayBookings} new today</span>
        </div>

        <div className="vdash-card">
          <div className="vdash-icon light"><Star size={18} /></div>
          <p>Average Rating</p>
          <h2>{data.avgRating}</h2>
          <span>Based on {data.totalReviews} reviews</span>
        </div>

        <div className="vdash-card">
          <div className="vdash-icon light"><TrendingUp size={18} /></div>
          <p>This Month</p>
          <h2>₹{data.thisMonth}</h2>
<span className={data.growth >= 0 ? "vdash-green" : "vdash-red"}>
  {data.growth >= 0 ? "+" : ""}
  {data.growth}% vs last month
</span>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="vdash-bottom">
   
        {/* ✅ CHART (REPLACED) */}
        <div className="vdash-box">
          <h3>Earnings Overview</h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.monthlyData} barCategoryGap="25%">

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

          {data?.recentBookings?.map((b, i) => (
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