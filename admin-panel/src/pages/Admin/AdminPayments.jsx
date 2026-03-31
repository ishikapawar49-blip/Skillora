import React from "react";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
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
import "./AdminPayments.css";

const revenueData = [
  { month: "Jan", revenue: 12400 }, { month: "Feb", revenue: 18200 },
  { month: "Mar", revenue: 22800 }, { month: "Apr", revenue: 19600 },
  { month: "May", revenue: 28400 }, { month: "Jun", revenue: 32100 },
  { month: "Jul", revenue: 35800 }, { month: "Aug", revenue: 38200 },
  { month: "Sep", revenue: 41500 }, { month: "Oct", revenue: 44200 },
  { month: "Nov", revenue: 46800 }, { month: "Dec", revenue: 48290 },
];

const transactions = [
  { id: "TXN-001", user: "Sarah Johnson", type: "Payment", amount: "$50.00", date: "Dec 15, 2024", status: "completed" },
  { id: "TXN-002", user: "Mike Chen", type: "Refund", amount: "$80.00", date: "Dec 14, 2024", status: "pending" },
  { id: "TXN-003", user: "Emma Wilson", type: "Payment", amount: "$90.00", date: "Dec 14, 2024", status: "completed" },
  { id: "TXN-004", user: "James Brown", type: "Payment", amount: "$200.00", date: "Dec 13, 2024", status: "completed" },
  { id: "TXN-005", user: "Lisa Davis", type: "Refund", amount: "$150.00", date: "Dec 12, 2024", status: "cancelled" },
  { id: "TXN-006", user: "Tom Anderson", type: "Payment", amount: "$500.00", date: "Dec 11, 2024", status: "completed" },
];

const AdminPayments = () => {
  return (
    <div className="apm-wrapper">

      {/* Header */}
      <div className="apm-header">
        <h2>Payments & Transactions</h2>
        <p>Revenue tracking and payment history</p>
      </div>

      {/* Stats */}
      <div className="apm-stats">
        <div className="apm-card gradient">
          <DollarSign />
          <h3>$48,290</h3>
          <p>Total Revenue</p>
        </div>

        <div className="apm-card">
          <TrendingUp />
          <h3>$8,420</h3>
          <p>This Month</p>
        </div>

        <div className="apm-card">
          <CreditCard />
          <h3>1,247</h3>
          <p>Transactions</p>
        </div>

        <div className="apm-card">
          <ArrowDownToLine />
          <h3>$2,180</h3>
          <p>Pending Payouts</p>
        </div>
      </div>

      {/* Chart */}
      <div className="apm-chart-card">
        <h3>Revenue Trend</h3>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="apmGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#apmGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="apm-table-container">
        <table className="apm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="apm-id">{t.id}</td>
                <td>{t.user}</td>
                <td>{t.type}</td>
                <td className="apm-amount">{t.amount}</td>
                <td>{t.date}</td>

                <td>
                  <span className={`apm-status apm-${t.status}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminPayments;