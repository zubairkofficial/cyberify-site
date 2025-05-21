import React, { useEffect, useState } from "react";
import Helpers from "../../Config/Helpers";
import { Link } from "react-router-dom";
import axios from "axios";

const IndustryUseCases = ({id, useCasesIds}) => {
  const [loading, setLoading] = useState(true); // Initially loading is true
  const [useCasesData, setUseCasesData] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null); // Track swiper instance

  const getUseCases = () => {
    setLoading(true);

    axios.get(`${Helpers.apiUrl}web/industry-usecases`, {
        params: {
            ids: JSON.parse(useCasesIds), // Send the array of use case IDs as a query parameter named 'ids'
        },
        headers: Helpers.authHeaders, // Send necessary headers
    })
    .then(response => {
        console.log('Use Cases: ', response.data);
        setUseCasesData(response.data);
        setLoading(false);
    })
    .catch(error => {
        console.error('Error fetching use cases:', error);
        setLoading(false);
    });
}


  useEffect(() => {
    console.log(id, useCasesIds)
    getUseCases(); // Fetch blogs on mount
  }, [id]); // Empty dependency array to run once on mount

  // Initialize Swiper instance
  useEffect(() => {
    if (typeof window !== "undefined" && !swiperInstance) {
      const swiper = new Swiper(".mil-revi-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".mil-slider-btn-next",
          prevEl: ".mil-slider-btn-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });

      setSwiperInstance(swiper); 
    }
  }, [swiperInstance]); 

  const getFirst40Words = (text) => {
    const textWithoutHtml = text.replace(/<\/?[^>]+(>|$)/g, "");
    const words = textWithoutHtml.split(/\s+/);
    const first40Words = words.slice(0, 40);
    return first40Words.join(" ") + (words.length > 40 ? "..." : "");
  };
  
  
  return (
    <section className="mil-reviews mil-p-80-120" style={{ backgroundColor: "white" }}>
      <div className="container">
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
  
        <div className="swiper-container mil-revi-slider mb-4" id="section-use">
          <div className="swiper-wrapper">
            {loading ? (
              <div>Loading...</div> 
            ) : (
              useCasesData.map((useCase, index) => {
                // const industryData = Blog.industry_data ? JSON.parse(Blog.industry_data) : null;
                // const firstContentSection = industryData?.contentSections?.[0];
                // const sectionsData = firstContentSection ? firstContentSection.sectionsData : "";
                
                return (
                  <div key={index} className="swiper-slide">
                    <div
                      className="card h-100"
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "1rem",
                        padding: "1rem",
                        margin: "0 0.5rem",
                        boxSizing: "border-box",
                        
                      }}
                    >
                      <img
                        src={Helpers.serverImage(useCase.thumbnail)}
                        alt={useCase.name}
                        style={{
                          width: "100%",
                          height: "12rem",
                          borderRadius: "1rem",
                        }}
                      />
                      <h5 className="mt-2">{useCase.name}</h5>
                      <p style={{color : "#575c60"}}>{getFirst40Words(useCase.short_description)}</p>
                      <Link
                        to={`/case-study/${useCase.slug}`}
                        className="mt-3 mil-button-use-case mil-accent-bg"
                      >
                        <h6 style={{ color: "white" }}>See More</h6>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
  
};

export default IndustryUseCases;
