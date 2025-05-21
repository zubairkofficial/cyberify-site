import { Link } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import { useState } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebook,
//   faFacebookF,
//   faInstagram,
//   faInstagramSquare,
//   faLinkedin,
//   faLinkedinIn,
// } from "@fortawesome/free-brands-svg-icons";
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaInstagramSquare,
  FaLinkedin,
  FaLinkedinIn,
} from "react-icons/fa";
const Footer = () => {
  const defaultSubscriber = {
    email: "",
  };

  const [subscriber, setSubscriber] = useState(defaultSubscriber);
  const [loading, setLoading] = useState(false);

  const saveSubscriber = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${Helpers.apiUrl}web/subscribe`, subscriber)
      .then((response) => {
        Helpers.toast("success", response.data.message);
        setSubscriber(defaultSubscriber);
      })
      .catch((error) => {
        Helpers.toast("error", error.response.data.message);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <footer className="mil-dark-bg">
      <div
        className="mil-deco mil-deco-accent"
        style={{ top: "0%", right: "10%" }}
      ></div>
      <img
        src={Helpers.staticImage("img/deco/map.png")}
        alt="background"
        className="mil-footer-bg"
      />
      <div className="container">
        <div className="mil-footer-content mil-p-120-90">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-4 mil-mb-30">
              <img
                src={Helpers.staticImage("logo-white.png")}
                alt=""
                className="mil-logo mil-mb-30"
                style={{ width: 140 }}
              />
              <p className="mil-light-soft mil-mb-30" style={{ textAlign: "justify" }}>
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
                  <form onSubmit={saveSubscriber}>
                    <input
                      className="mil-rounded-input mil-text-center mil-mb-5"
                      value={subscriber.email}
                      onChange={(e) =>
                        setSubscriber({ ...subscriber, email: e.target.value })
                      }
                      type="text"
                      placeholder="Your email address"
                    />
                    <button
                      className="mil-button mil-accent-bg mil-fw"
                      onClick={saveSubscriber}
                    >
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
              <a href="https://www.facebook.com/CyberifyOfficial" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.facebook.com/CyberifyOfficial" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            </li>
            <li className="mil-adapt-links">
              <a href="https://www.instagram.com/cyberifyofficials/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.instagram.com/cyberifyofficials/" target="_blank" rel="noopener noreferrer">
                <FaInstagramSquare />
              </a>
            </li>
            <li className="mil-adapt-links">
              <a href="https://www.linkedin.com/company/cyberifyai/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="https://www.linkedin.com/company/cyberifyai/" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
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

export default Footer;
