import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "4rem",marginTop: "50px" }}>
      <h1 style={{ fontSize: "4rem", color: "#ff6b6b" }}>404</h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ marginBottom: "2rem" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;