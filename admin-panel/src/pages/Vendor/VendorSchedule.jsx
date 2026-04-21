import "./VendorSchedule.css";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function VendorSchedule() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [bookings, setBookings] = useState([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();


  const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();

const days = Array.from({ length: firstDay }, () => null)
  .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

const formatDate = (day) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  // ✅ FETCH FUNCTION (OUTSIDE useEffect)
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("vendorToken");
      const res = await fetch("http://localhost:5000/api/bookings/vendor-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ INITIAL FETCH
  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ AUTO REFRESH
  useEffect(() => {
    const interval = setInterval(() => {
      fetchBookings();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ TRANSFORM BOOKINGS → APPOINTMENTS
  const appointments = {};
  bookings.forEach(b => {
    if (!b.selectedDate) return;
    const date = new Date(b.selectedDate);
    const dateStr = date.toISOString().split("T")[0];
    if (!appointments[dateStr]) {
      appointments[dateStr] = [];
    }
    appointments[dateStr].push({
      time: b.selectedTime,
      client: b.user?.name || "User",
      service: b.service?.title || "Service",
      status: b.status
    });
  });

  // ✅ NOW SAFE TO USE
  const todayAppts = appointments[selectedDate] || [];


  return (
    <div className="ven-sch-container">

      {/* HEADER */}
      <div className="ven-sch-header">
        <h1>Schedule & Availability</h1>
        <p>Manage your calendar and appointments</p>
      </div>

      <div className="ven-sch-grid">

        {/* CALENDAR */}
        <div className="ven-sch-card ven-sch-calendar">

          <div className="ven-sch-cal-header">
            <h3>{MONTHS[month]} {year}</h3>

            <div className="ven-sch-nav">
              <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="ven-sch-days">
            {DAYS.map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="ven-sch-dates">
            {days.map((day, i) => {
              if (!day) return <div key={i}></div>;

              const dateStr = formatDate(day);
              const has = appointments[dateStr];
              const selected = dateStr === selectedDate;

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`ven-sch-date 
                    ${selected ? "selected" : ""}
                    ${has ? "has" : ""}
                  `}
                >
                  {day}
                  {has && !selected && <span className="dot"></span>}
                </button>
              );
            })}
          </div>

        </div>

        {/* APPOINTMENTS */}
        <div className="ven-sch-card ven-sch-appointments">
          <h3>Appointments</h3>

          {todayAppts.length === 0 ? (
            <p className="ven-sch-empty">No appointments for this day</p>
          ) : (
            todayAppts.map((a, i) => (
              <div key={i} className="ven-sch-appt">
                <span className="time">{a.time}</span>
                <p className="client">{a.client}</p>
                <p className={`service ${a.status}`}>
                  {a.service} • {a.status}
                </p>
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}