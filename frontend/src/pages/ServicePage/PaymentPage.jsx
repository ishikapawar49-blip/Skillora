import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { service, selectedDate, selectedTime, address } =
    location.state || {};

  // Load Razorpay
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay failed to load");
      return;
    }

    // Create order
    const orderRes = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: service.price,
        }),
      }
    );

    const order = await orderRes.json();

    const options = {
      key: "rzp_test_SbhZQJc0uLUoyM", // replace if regenerated
      amount: order.amount,
      currency: "INR",
      name: "Skillora",
      description: service.title,
      order_id: order.id,

      handler: async function (response) {

  // ✅ 1. VERIFY PAYMENT
  const verifyRes = await fetch(
    "http://localhost:5000/api/payment/verify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    }
  );

  const data = await verifyRes.json();

  if (!data.success) {
    alert("Payment failed ❌");
    return;
  }

  // ✅ 2. CREATE BOOKING IN DATABASE
  const bookingRes = await fetch(
    "http://localhost:5000/api/bookings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({
      serviceId: service._id,
      selectedDate: selectedDate.fullDate.toISOString(), // 🔥 FIX HERE
      selectedTime,
      address,
      paymentId: response.razorpay_payment_id,
    }),
    }
  );

  const booking = await bookingRes.json();

  // ✅ 3. NAVIGATE WITH BOOKING DATA
  navigate(`/services/${service.slug}/book/success/${booking._id}`);
},

      prefill: {
        name: address?.name,
        contact: address?.phone,
      },

      theme: {
        color: "#7b61ff",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!service || !service.price) {
  return <h2>Loading payment details...</h2>;
}

  return (
    <div className="payment-container">
      <div className="payment-left">
        <h1>Payment</h1>

        <div className="payment-card">
          <h3>{service?.title}</h3>
          <p>{service?.category}</p>

          <div className="payment-row">
          <span>Date</span>
          <span>
            {selectedDate?.fullDate
            ? new Date(selectedDate.fullDate).toLocaleDateString("en-IN")
            : "-"}
          </span>
          </div>

          <div className="payment-row">
            <span>Time</span>
            <span>{selectedTime}</span>
          </div>

          <div className="payment-row">
            <span>Address</span>
            <span>
              {address?.flat}, {address?.locality}
            </span>
          </div>

          <div className="payment-total">
            <span>Total</span>
            <span>₹{service?.price}</span>
          </div>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;