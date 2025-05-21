import React from "react";
import PropTypes from "prop-types";
import Helpers from "../Config/Helpers"; // Adjust the path as needed

const PageBannerNew = ({ bannerImage, Name }) => {
    console.log(bannerImage,Name)
  return (
    <div className="" style={{ marginTop: "100px",
        background: `url(${Helpers.serverImage(bannerImage)}), rgba(0, 0, 0, 0.7)`,  
        objectPosition: "center center",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat:"no-repeat",
        backgroundBlendMode: "darken",
    }}>
      <div
        className="d-flex align-items-center container justify-content-center mil-p-120-120"
        style={{
          position: "relative",  
          width: "100%",
          height: "auto",  
          // paddingTop:"20vh",
          // paddingBottom:"20vh"
        }}
      >
        {/* Hero Text */}
        <h1
          className="text-center"
          style={{
            color: "white",
            fontSize: "2.5rem",
            zIndex: 1,
            textAlign:"center"
          }}
        >
          <span className="mil-light">{Name}</span>
        </h1>
      </div>
    </div>
  );
};

// PropTypes for type checking and better developer experience
PageBannerNew.propTypes = {
  bannerImage: PropTypes.string.isRequired, // URL or path to the image
  Name: PropTypes.string.isRequired,  // Text to display on the banner
};

export default PageBannerNew;
