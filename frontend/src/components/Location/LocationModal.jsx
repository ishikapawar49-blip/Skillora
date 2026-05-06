import "./LocationModal.css";
import { useEffect, useState, useRef } from "react";

function LocationModal({
  closeModal,
  fetchUserLocation,
  setLocation
}) {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const searchTimeout = useRef();

  // const searchLocation = async (value) => {

  //   setSearch(value);

  //   if (value.length < 3) {
  //     setResults([]);
  //     return;
  //   }

  //   const response = await fetch(
  //     `https://us1.locationiq.com/v1/search?key=${import.meta.env.VITE_LOCATIONIQ_KEY}&q=${value}&format=json`
  //   );

  //   const data = await response.json();

  //   setResults(data);

  // };

  const searchLocation = async (value) => {

  setSearch(value);

  if (value.length < 3) {

    setResults([]);
    return;

  }

  clearTimeout(searchTimeout.current);

  searchTimeout.current = setTimeout(async () => {

    try {

      const response = await fetch(

        `https://us1.locationiq.com/v1/search?key=${
          import.meta.env.VITE_LOCATIONIQ_KEY
        }&q=${value}&countrycodes=in&format=json`

      );

      const data = await response.json();

      // 🔥 IMPORTANT
      if (Array.isArray(data)) {

        setResults(data);

      } else {

        setResults([]);

      }

    } catch (error) {

      console.log(error);

      setResults([]);

    }

  }, 700);

};

  // =========================================
  // SELECT LOCATION
  // =========================================

  // const selectLocation = (place) => {

  //   const locationName = place.display_name
  //     .split(",")
  //     .slice(0, 2)
  //     .join(",");

  //   localStorage.setItem(
  //     "userLocation",
  //     locationName
  //   );

  //   setLocation(locationName);

  //   closeModal();

  // };

const searchLocation = async (value) => {

  setSearch(value);

  if (value.trim().length < 3) {

    setResults([]);
    return;

  }

  clearTimeout(searchTimeout.current);

  searchTimeout.current = setTimeout(async () => {

    try {

      const response = await fetch(

        `https://us1.locationiq.com/v1/search?key=${
          import.meta.env.VITE_LOCATIONIQ_KEY
        }&q=${encodeURIComponent(value)}
        &countrycodes=in
        &limit=5
        &format=json`

      );

      // 🔥 RATE LIMIT HANDLE
      if (response.status === 429) {

        console.log("Too many requests");

        setResults([]);

        return;

      }

      const data = await response.json();

      console.log(data);

      // 🔥 SAFE CHECK
      if (Array.isArray(data)) {

        setResults(data);

      } else {

        setResults([]);

      }

    } catch (error) {

      console.log(error);

      setResults([]);

    }

  }, 1200); // 🔥 IMPORTANT

};

  return (

    <div className="location-modal-overlay">

      <div className="location-modal">

        {/* TOP */}

        <div className="location-header">

          <h2>Change Location</h2>

          <button
            className="close-btn"
            onClick={closeModal}
          >
            ✕
          </button>

        </div>

        {/* SEARCH */}

        <div className="location-search">

          <button
            className="detect-btn"
            onClick={fetchUserLocation}
          >
            Detect my location
          </button>

          <span className="or-text">OR</span>

          <input
            type="text"
            placeholder="Search delivery location"
            value={search}
            onChange={(e) =>
              searchLocation(e.target.value)
            }
          />

        </div>



        {/* RESULTS */}

        <div className="location-results">

{Array.isArray(results) &&
results.map((place, index) => (
  
            <div
              key={index}
              className="location-item"
              onClick={() => selectLocation(place)}
            >

              📍 {place.display_name}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default LocationModal;