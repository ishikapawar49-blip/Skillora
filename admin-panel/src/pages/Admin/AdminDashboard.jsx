import React, { useState, useEffect } from "react";
import { Users, Store, CalendarCheck, DollarSign, TrendingUp, ArrowUpRight,} from "lucide-react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,LineChart, Line, PieChart, Pie, Cell} from "recharts";
import "./AdminDashboard.css";


const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6", "#22c55e"];

const AdminDashboard = () => {

  const [stats, setStats] = useState({
  totalUsers: 0,
  totalVendors: 0,
  totalBookings: 0,
  revenue: 0,
});

const [barData, setBarData] =
useState([]);

const [lineData, setLineData] =
useState([]);

const [pieData, setPieData] =
useState([]);

const [activities, setActivities] =
useState([]);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setStats(data);
      setBarData(data.revenueChart || []);

setLineData(data.bookingChart || []);

setPieData(data.pieChart || []);

setActivities(data.activities || []);
    } catch (error) {
      console.log(error);
    }
  };

  fetchStats();
}, []);

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your overview.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="card gradient">
          <Users />
          <h3>{stats.totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div className="card">
          <Store />
          <h3>{stats.totalVendors}</h3>
          <p>Total Vendors</p>
        </div>

        <div className="card">
          <CalendarCheck />
          <h3>{stats.totalBookings}</h3>
          <p>Total Bookings</p>
        </div>

        <div className="card">
          <DollarSign />
          <h3>₹{stats.revenue}</h3>
          <p>Revenue</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart-card">
          <h3>Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Bookings This Week</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#ec4899" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <div className="chart-card">
          <h3>Service Categories</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={40} outerRadius={70}>
                {Array.isArray(pieData) &&
pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="activity">

<h3>
Recent Activity
</h3>

{Array.isArray(activities) &&
activities.map((item, i) => (

<div
className="activity-item"
key={i}
>

<TrendingUp
className="activity-icon"
/>

<p>
{item.text}
</p>

<ArrowUpRight />

</div>

))}

</div>
      </div>
    </div>
  );
};

export default AdminDashboard;