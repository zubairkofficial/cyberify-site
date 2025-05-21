import React, { useState, useEffect } from "react";
import jsonData from "./dummycontent";
import NewsletterCard from "./NewsletterCard";
// import Sticky from 'react-sticky-el';


const IndustryTableOfContent = ({tableIntro, tableData}) => {
  const [isMobile, setIsMobile] = useState(false);
  console.log("Table Data Andar",tableData)
  console.log(Array.isArray(tableData));
  // Handle window resizing to toggle the state for mobile layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Enable mobile layout if width < 768px
    };

    // Check on mount
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="d-flex"
      style={{
        paddingRight: "20px",
        justifyContent: isMobile ? "center" : "flex-start",
        // height:"100%", // Center content when on mobile
        width: isMobile ? "100%" : "auto", // Full width when on mobile
      }}
    >
      <div
        className="flex-1"
        style={{
          maxWidth: isMobile ? "100%" : "auto", // Ensure table of contents takes full width on mobile
          padding: isMobile ? "0 1rem" : "0", // Add padding to center content in mobile view
        }}
      >
        {/* Table of Contents Heading */}
        <h3 className="my-2">Table of Contents</h3>

        {/* Intro Heading */}
        <h4
          className="mt-1 mb-2 industry-para"
          onClick={() => handleScrollToSection(tableIntro.id)}
          style={{ cursor: "pointer" }}
        >
          {tableIntro.heading}
        </h4>

        {/* Table of Contents Items */}
        {tableData.map((section, index) => (
          <React.Fragment key={index}>
            {/* Main Heading */}
            <div
              style={{
                width: "95%",
                wordWrap: "normal",
                cursor: "pointer",
              }}
            >
              <p
                className="mt-3 mb-2 industry-table-item"
                onClick={() => handleScrollToSection(section.id)}
              >
                {section.heading}
              </p>

              {/* List Items */}
              {section.listItems.length > 0 && (
                <ul className="table-list-margin" style={{ listStyleType: "disc" }}>
                  {section.listItems.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="industry-table-item"
                      onClick={() => handleScrollToSection(item.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </React.Fragment>
        ))}
        {/* <Sticky boundaryElement=".boundaryelement" hideOnBoundaryHit={true}>
          <NewsletterCard />
        </Sticky> */}
      </div>

      {/* Vertical Divider (only visible on desktop) */}
      {!isMobile && (
        <div
          className="mil-vertical-divider"
          style={{ marginLeft: "0.75rem", height: "auto" }}
        ></div>
      )}
    </div>
  );
};

export default IndustryTableOfContent;
