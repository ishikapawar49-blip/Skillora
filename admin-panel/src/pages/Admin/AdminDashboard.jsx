import React from "react";
import {
  Users,
  Store,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import "./AdminDashboard.css";

const barData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 6100 },
  { month: "May", revenue: 8400 },
  { month: "Jun", revenue: 9200 },
];

const lineData = [
  { day: "Mon", bookings: 12 },
  { day: "Tue", bookings: 19 },
  { day: "Wed", bookings: 15 },
  { day: "Thu", bookings: 22 },
  { day: "Fri", bookings: 28 },
  { day: "Sat", bookings: 35 },
  { day: "Sun", bookings: 18 },
];

const pieData = [
  { name: "Beauty", value: 35 },
  { name: "Fitness", value: 25 },
  { name: "Education", value: 20 },
  { name: "Other", value: 20 },
];

const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6", "#22c55e"];

const AdminDashboard = () => {
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
          <h3>12,486</h3>
          <p>Total Users</p>
        </div>

        <div className="card">
          <Store />
          <h3>842</h3>
          <p>Total Vendors</p>
        </div>

        <div className="card">
          <CalendarCheck />
          <h3>3,247</h3>
          <p>Total Bookings</p>
        </div>

        <div className="card">
          <DollarSign />
          <h3>$48,290</h3>
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
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="activity">
          <h3>Recent Activity</h3>

          {[
            { text: "New vendor registered", icon: Store },
            { text: "Booking completed", icon: CalendarCheck },
            { text: "Payment received", icon: DollarSign },
            { text: "New user signup", icon: Users },
            { text: "Revenue milestone", icon: TrendingUp },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div className="activity-item" key={i}>
                <Icon className="activity-icon" />
                <p>{item.text}</p>
                <ArrowUpRight />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;