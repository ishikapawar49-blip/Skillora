import React, { useEffect, useState } from "react";
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

const AdminPayments = () => {

  const [data, setData] = useState({
    revenueData: [],
    transactions: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      "http://localhost:5000/api/admin/payments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await res.json();
    setData(json);
  };

const handleWithdraw = async () => {

  const input = prompt(
    `Enter withdraw amount (Available ₹${data.availableBalance || 0})`
  );

  if (!input) return;

  const amount = Number(input);

  if (isNaN(amount) || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  if (amount > data.availableBalance) {
    alert("Insufficient balance");
    return;
  }

  const token = localStorage.getItem("adminToken");

  const res = await fetch(
    "http://localhost:5000/api/admin/payments/withdraw",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    }
  );

  const json = await res.json();

  if (json.success) {
    alert(`₹${amount} Withdraw Successful`);
    fetchData();
  } else {
    alert("Withdraw Failed");
  }
};


  return (
    <div className="apm-wrapper">

      <div className="apm-header">
        <h2>Payments & Transactions</h2>
        <p>Revenue tracking and payment history</p>
      </div>

      {/* STATS */}
      <div className="apm-stats">

        <div className="apm-card gradient">
          <DollarSign />
          <h3>₹{data.totalRevenue || 0}</h3>
          <p>Total Platform Revenue</p>
        </div>

        <div className="apm-card">
          <TrendingUp />
          <h3>₹{data.thisMonthRevenue || 0}</h3>
          <p>This Month</p>
        </div>

        <div className="apm-card">
          <CreditCard />
          <h3>{data.totalTransactions || 0}</h3>
          <p>Transactions</p>
        </div>

        <div
          className="apm-card"
          onClick={handleWithdraw}
          style={{ cursor:"pointer" }}
        >
          <ArrowDownToLine />
          <h3>₹{data.availableBalance || 0}</h3>
          <p>Withdraw</p>
        </div>

      </div>


      {/* CHART */}
      <div className="apm-chart-card">
        <h3>Revenue Trend</h3>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data.revenueData}>
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


      {/* TABLE */}
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

{data.transactions?.length === 0 ? (
<tr>
<td colSpan="6" style={{textAlign:"center",padding:"30px"}}>
No Withdraw History
</td>
</tr>
) : (

data.transactions.map((t) => (
<tr key={t.id}>

<td className="apm-id">{t.id}</td>

<td>{t.user}</td>

<td>{t.type}</td>

<td className="apm-amount">₹{t.amount}</td>

<td>{new Date(t.date).toLocaleDateString()}</td>

<td>
<span className={`apm-status apm-${t.status}`}>
{t.status}
</span>
</td>

</tr>
))

)}

</tbody>



        </table>
      </div>

    </div>
  );
};

export default AdminPayments;