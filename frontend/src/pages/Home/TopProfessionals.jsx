import "./TopProfessionals.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiMapPin, FiCheckCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

function TopProfessionals() {

  const [professionals, setProfessionals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchVendors = async () => {

      try {

        const coords = JSON.parse(
          localStorage.getItem("userCoordinates")
        );

        const savedLocation =
          localStorage.getItem("userLocation");

        let city = "";

        if (savedLocation) {

          city = savedLocation
            .split(",")[1]
            ?.split("-")[0]
            ?.trim();

        }

        const res = await fetch(

`${import.meta.env.VITE_API_URL}/api/vendor/all?lat=${coords?.lat}&lng=${coords?.lng}&city=${city}`

        );

        const data = await res.json();

        // 🔥 ONLY FIRST 3
        setProfessionals(data.slice(0, 3));

      } catch (err) {

        console.log(err);

      }

    };

    fetchVendors();

  }, []);

  return (

    <section className="tp-section">

      <div className="tp-container">

        {/* HEADER */}

        <div className="tp-header">

          <div>

            <h2>Top Professionals</h2>

            <p>
              Verified experts ready to serve you
            </p>

          </div>

          <button
            className="tp-view"
            onClick={() => navigate("/professionals")}
          >
            View All →
          </button>

        </div>

        {/* GRID */}

        <div className="professionals-grid">

          {professionals.map((pro) => (

            <div
              className="professional-card"
              key={pro._id}
            >

              <div className="professional-top">

                <div className="professionals-image">

                  <img
                    src={
                      pro.profileImage ||
                      "https://via.placeholder.com/100"
                    }
                  />

                  <FiCheckCircle className="professionals-verified"/>

                </div>

                <div className="professionals-info">

                  <h3>{pro.ownerName}</h3>

                  <p className="professionals-role">

                    {pro.category || "Service Expert"}

                  </p>

                  <div className="professionals-meta">

                    <span className="professionals-rating">

                      <FaStar/>

                      {pro.rating || 4.5}

                      <span className="professionals-reviews">

                        (0)

                      </span>

                    </span>

                    <span className="professionals-location">

                      <FiMapPin/>

                      {
                        typeof pro.locality === "string" ||
                        typeof pro.city === "string" ||
                        typeof pro.pincode === "string"
                          ? `${pro.locality || ""}${pro.locality ? ", " : ""}
                             ${typeof pro.city === "string" ? pro.city : ""}
                             ${pro.pincode ? " - " : ""}
                             ${pro.pincode || ""}`
                          : "Location not added"
                      }

                    </span>

                  </div>

                </div>

              </div>

              <div className="professionals-divider"></div>

              <div className="professional-bottom">

                <p>
                  {pro.jobsCompleted || 100}
                  {" "}
                  jobs completed
                </p>

                <button
                  className="professionals-book-btn"
                  onClick={() =>
                    navigate(`/services?vendor=${pro._id}`)
                  }
                >
                  Book Now
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default TopProfessionals;