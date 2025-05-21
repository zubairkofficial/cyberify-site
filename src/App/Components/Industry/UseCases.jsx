import React, { useEffect, useState } from "react";
import useCaseData from "./dummyUseCases"; // Assuming this is your JSON file for use cases
import Helpers from "../../Config/Helpers"; // Assuming this is your helper for static assets like images

const UseCases = () => {
  const [loading, setLoading] = useState(false);
  const [useCases, setUseCases] = useState([]);

  useEffect(() => {
    // Assuming your dummyUseCases JSON is loaded and available in the 'useCaseData' file.
    setUseCases(useCaseData.useCases); // Load use case data from the JSON file
  }, []);

  return (
    <section className="mil-reviews mil-p-80-120">
      <div className="industry-margin">
        <div className="mil-divider use-case-mil-divider"></div>
        <div className="d-flex justify-content-between">
        <h2 className="my-5">Check Relevant Use Cases</h2>
        <div className="mil-slider-nav">
                <div className="mil-slider-btn-prev mil-revi-prev">
                  <i className="fas fa-chevron-left"></i> 
                </div>
                <div className="mil-slider-btn-next mil-revi-next">
                  <i className="fas fa-chevron-right"></i> 
                </div>
              </div>
        </div>
        
        <div className="swiper-container mil-revi-slider">
          <div className="swiper-wrapper">
            {!loading &&
              useCases.map((useCase, index) => (
                <div key={index} className="swiper-slide">
                  <div
                    className="card h-100"
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "1rem",
                      padding: "2rem",
                      margin: "0 0.5rem",
                      boxSizing: "border-box",
                      minHeight: "42rem", // Fixed minimum height
                      // display: "flex",
                      // flexDirection: "column", // Ensure consistent layout
                      // justifyContent: "space-around", // Distribute content evenly
                    }}
                  >
                    <img
                      src={Helpers.staticImage(useCase.imagePath)} // Image path handler
                      alt={useCase.title}
                      className="card-img-top"
                      style={{
                        objectFit: "cover",
                        height: "100%", // Fixed height for consistency
                        width: "100%", // Fixed height for consistency
                        borderRadius: "1rem", // Fixed height for consistency
                      }}
                    />
                    <div className="card-body">
                      <h4 className="card-title my-2">{useCase.title}</h4>
                      {useCase.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="mb-1">
                          <p style={{ color: "black" }}>
                            {" "}
                            <span style={{ fontWeight: "700" }}>
                              {" "}
                              {feature.subheading}:{" "}
                            </span>{" "}
                            {feature.content}
                          </p>
                        </div>
                      ))}
                      <button className="mt-3 mil-button-use-case mil-accent-bg">
                        <h6 style={{color:"white"}}>See More</h6>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Swiper Navigation */}
          {/* <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div> */}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
