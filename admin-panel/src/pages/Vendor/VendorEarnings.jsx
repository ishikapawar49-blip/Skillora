import "./VendorEarnings.css";
import { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Wallet,
  ArrowDownToLine,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function VendorEarnings() {


const [stats, setStats] = useState({});
const [earningsData, setEarningsData] = useState([]);
const [payouts, setPayouts] = useState([]);


useEffect(() => {
  const fetchEarnings = async () => {
    try {
      const token = localStorage.getItem("vendorToken");

      const res = await fetch("http://localhost:5000/api/vendor/earnings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setStats(data.stats);
      setEarningsData(data.chart);
      setPayouts(data.payouts);

    } catch (err) {
      console.log(err);
    }
  };

  fetchEarnings();
}, []);

  return (
    <div className="ven-earn-container">

      {/* HEADER */}
      <div className="ven-earn-header">
        <div>
          <h1>Earnings & Payments</h1>
          <p>Track your earnings and manage withdrawals</p>
        </div>

        <button className="ven-earn-btn">
          <ArrowDownToLine size={16} />
          Withdraw
        </button>
      </div>

      {/* STATS */}
      <div className="ven-earn-stats">

        <div className="ven-earn-card gradient">
          <DollarSign size={18} />
          <p>Total Earnings</p>
          <h2>₹{stats?.totalEarnings || 0}</h2>
          <span>+18%</span>
        </div>

        <div className="ven-earn-card">
          <TrendingUp size={18} />
          <p>This Month</p>
          <h2>₹{stats?.thisMonth || 0}</h2>
          <span className="green">+12%</span>
        </div>

        <div className="ven-earn-card">
          <Wallet size={18} />
          <p>Available Balance</p>
          <h2>₹{stats?.availableBalance || 0}</h2>
          <span>Ready to withdraw</span>
        </div>

        <div className="ven-earn-card">
          <ArrowDownToLine size={18} />
          <p>Total Withdrawn</p>
          <h2>₹{stats?.totalWithdrawn || 0}</h2>
          <span>{payouts.length} payouts</span>
        </div>

      </div>

      {/* CHART */}
      <div className="ven-earn-chart-box">
        <h3>Earnings Trend</h3>

        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={earningsData}>
            <defs>
              <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#7c3aed"
              strokeWidth={2}
              fill="url(#earnGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* TABLE */}
      <div className="ven-earn-table">

        <div className="ven-earn-row head">
          <span>Payout ID</span>
          <span>Amount</span>
          <span>Method</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {payouts.map((p) => (
  <div key={p._id} className="ven-earn-row">

    <span className="mono">{p.payoutId}</span>

    <span className="bold">₹{p.amount}</span>

    <span>{p.method}</span>

    <span>
      {new Date(p.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
    </span>

    <span className={`badge ${p.status}`}>
      {p.status}
    </span>

  </div>
))}

      </div>

    </div>
  );
}