import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Helpers from "../../Config/Helpers";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebook,
//   faFacebookF,
//   faInstagram,
//   faInstagramSquare,
//   faLinkedin,
//   faLinkedinIn,
// } from "@fortawesome/free-brands-svg-icons";

const NewFooter = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (window.google && mapRef.current) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: 40.7128, lng: -74.006 }, // New York
          zoom: 12,
        });
        console.log("✅ Google Map Initialized Successfully");
      } else {
        console.error("❌ Google Maps API or map container not available");
      }
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDcfN0b1_bI-np84t35URWv3-Im1rCSzpc`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("✅ Google Maps API Loaded Successfully");
      initMap();
    };
    script.onerror = () => {
      console.error("❌ Google Maps API failed to load");
    };
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer
      className="mil-dark-bg"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Google Map as Background */}
      <div
        ref={mapRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0, // Adjusted zIndex
        }}
      ></div>

      {/* Footer Content with Semi-Transparent Background */}
      <div
        className="container"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          position: "relative",
          zIndex: 1,
          marginTop: "10px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          className="mil-footer-content mil-p-120-90"
          style={{
            padding: "20px", // Optional: Add padding
          }}
        >
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-4 mil-mb-30">
              <img
                src={Helpers.staticImage("logo-white.png")}
                alt=""
                className="mil-logo mil-mb-30"
                style={{ width: 140 }}
              />
              <p className="mil-light-soft mil-mb-30">
                Cyberify delivers innovative AI solutions for web and mobile
                applications, helping businesses achieve excellence with
                tailored technology, agile development, and ongoing support.
                Partner with us for optimized growth and success.
              </p>
            </div>
            <div className="col-xl-7 mil-mt-60-adapt">
              <div className="row">
                <div className="col-lg-7 mil-mb-30">
                  <h3 className="mil-light mil-up-font mil-mb-30">
                    Join The <span className="mil-accent">Cyberify</span> <br />
                    Experience
                  </h3>
                  <p className="mil-light">Contact Us</p>
                  <p className="mil-light">
                    <i className="fa-light fa-envelope"></i> &emsp;
                    <span className="mil-light-soft">info@cyberify.co</span>
                  </p>
                  <p className="mil-light">
                    <i className="fa-light fa-phone"></i> &emsp;
                    <span className="mil-light-soft">+44 7704 593899</span>
                  </p>
                  <p className="mil-light">
                    <i className="fa-light fa-phone"></i> &emsp;
                    <span className="mil-light-soft">+92 335 0804914</span>
                  </p>
                </div>
                <div className="col-lg-5 mil-mb-30">
                  <form>
                    <input
                      className="mil-rounded-input mil-text-center mil-mb-5"
                      type="text"
                      placeholder="Your email address"
                    />
                    <button className="mil-button mil-accent-bg mil-fw">
                      <span>Subscribe Now</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mil-divider mil-light"></div>
        <div className="mil-footer-links">
          <ul className="mil-social mil-light">
            <li className="mil-adapt-links">
              <a
                href="https://www.facebook.com/CyberifyOfficial"
                target="_blank"
              >
                {/* <FontAwesomeIcon icon={faFacebook} /> Facebook Icon */}
              </a>
              <a
                href="https://www.facebook.com/CyberifyOfficial"
                target="_blank"
              >
                {/* <FontAwesomeIcon icon={faFacebookF} />{" "} */}
                {/* Compact Facebook Icon */}
              </a>
            </li>
            <li className="mil-adapt-links">
              <a
                href="https://www.instagram.com/cyberifyofficials/"
                target="_blank"
              >
                {/* <FontAwesomeIcon icon={faInstagram} /> Instagram Icon */}
              </a>
              <a
                href="https://www.instagram.com/cyberifyofficials/"
                target="_blank"
              >
                {/* <FontAwesomeIcon icon={faInstagramSquare} />{" "} */}
                {/* Instagram Square Icon */}
              </a>
            </li>
            <li className="mil-adapt-links">
              <a
                href="https://www.linkedin.com/company/cyberifyai/"
                target="_blank"
              >
                {/* <FontAwesomeIcon icon={faLinkedin} /> LinkedIn Icon */}
              </a>
              <a
                href="https://www.linkedin.com/company/cyberifyai/"
                target="_blank"
              >
                {/* <FontAwesomeIcon icon={faLinkedinIn} />{" "} */}
                {/* Compact LinkedIn Icon */}
              </a>
            </li>
          </ul>

          <ul className="mil-additional-links mil-light">
            <li>
              <Link to="/case-studies">Case Studies</Link>
            </li>
            <li>
              <Link to="/insights">Insights</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mil-footer-bottom">
        <div className="container">
          <p className="mil-text-sm mil-light">
            © Cyberify {new Date().getFullYear()}.
          </p>
          <p className="mil-text-sm mil-light">All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
