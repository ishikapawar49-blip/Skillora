import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

function LocationSelector() {

  const [loading, setLoading] = useState(false);

  const getLiveLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const city = "Nagpur"; // later API se auto kar sakte

        await fetch(`${API}/api/users/location`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
          },
          body: JSON.stringify({ lat, lng, city })
        });

        setLoading(false);
        alert("Location updated ✅");
      },
      (err) => {
        setLoading(false);
        alert("Location permission denied ❌");
      }
    );
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <button onClick={getLiveLocation}>
        {loading ? "Getting location..." : "Use My Location 📍"}
      </button>
    </div>
  );
}

export default LocationSelector;