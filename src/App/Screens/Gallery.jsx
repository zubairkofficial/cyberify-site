import React, { useEffect, useState, useCallback } from "react";
import PageBanner from "../Components/Banner";
import Helpers from "../Config/Helpers";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Gallery = () => {
  const [categories, setCategories] = useState([]);
  const [, setReRender] = useState();
  const memoizedCallback = useCallback(() => { setReRender({}) }, []);
  const [loading, setLoading] = useState(true); // Track loading state
  const [swiperInstances, setSwiperInstances] = useState([]); // Track swiper instances for each category
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // State to handle selected image
  const [currentSlides, setCurrentSlides] = useState({});


  // Fetch gallery categories
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}web/galleries`,
        Helpers.authHeaders
      );
      setCategories(response.data); // Set categories data in state
      setLoading(false); // Set loading to false after data fetch
    } catch (error) {
      console.error("Error fetching Categories:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Initialize Swiper after data is loaded and images are rendered
  useEffect(() => {
    if (!loading && categories.length > 0) {
      categories.forEach((category, index) => {
        const swiperClass = `.mil-blog-slider-${index}`; // Unique class for each swiper
        const prevButtonClass = `.mil-slider-btn-prev-${index}`; // Unique class for prev button
        const nextButtonClass = `.mil-slider-btn-next-${index}`; // Unique class for next button

        const swiper = new Swiper(swiperClass, {
          slidesPerView: 3,
          spaceBetween: 25,
          navigation: {
            nextEl: nextButtonClass,
            prevEl: prevButtonClass,
          },
          loop: false,
          on: {
            slideChange: function () {
              setCurrentSlides(prev => ({
                ...prev,
                [index]: this.activeIndex,
              }));
            },
          },
        });

        setSwiperInstances(prev => [...prev, swiper]); // Store each swiper instance
        setCurrentSlides(prev => ({
          ...prev,
          [index]: 0
        }));
      });
    }
  }, [loading, categories]);

  // Open the modal with the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Helmet>
        <title>Gallery - Cyberify</title>
        <link rel="canonical" href="https://www.cyberify.co/gallery" />
      </Helmet>
      <PageBanner pageName={"Gallery"} />
      <section className="mil-blog mil-p-120-120">
        <div className="mil-deco" style={{ top: 0, right: 30 }}></div>
        <div className="container">
          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            categories.map((category, index) => {
              const currentSlide = currentSlides[index] || 0;
              const totalSlides = category.images.length;
              const isPrevInactive = currentSlide === 0;
              const isNextInactive = currentSlide === totalSlides - 1;              
              return (
                <div key={category.id} className="row align-items-center mil-mb-20">
                  <div className="row align-items-center mil-mb-30">
                    <div className="col-md-6 col-xl-6">
                      <h2>{category.name}</h2>
                    </div>
                    <div className="col-md-6 col-xl-6">
                      <div className="mil-adaptive-right mil-mt-60-adapt">
                        <div className="mil-slider-nav" style={{ display: "flex", gap: '20px', color: "#f57c00" }}>

                          <div
                            className={`mil-slider-btn-prev-${index}`}
                            style={{
                              display: "flex",
                              gap: '5px',
                              color: isPrevInactive ? "#ccc" : "#f57c00",
                              alignItems: "center",
                              cursor: isPrevInactive ? "default" : "pointer",
                              pointerEvents: isPrevInactive ? "none" : "auto",
                            }}
                          >
                            <i className="fas fa-arrow-left"></i>
                            <span className="mil-h6">Prev</span>
                          </div>

                          {/* Next */}
                          <div
                            className={`mil-slider-btn-next-${index}`}
                            style={{
                              display: "flex",
                              gap: '5px',
                              color: isNextInactive ? "#ccc" : "#f57c00",
                              alignItems: "center",
                              cursor: isNextInactive ? "default" : "pointer",
                              pointerEvents: isNextInactive ? "none" : "auto",
                            }}
                          >
                            <span className="mil-h6">Next</span>
                            <i className="fas fa-arrow-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Swiper Container with dynamic class */}
                  <div className={`swiper-container mil-blog-slider-${index} mil-mb-40`}>
                    <div className="swiper-wrapper">
                      {category.images.map((image) => (
                        <div key={image.id} className="swiper-slide mil-slide-50">
                          <Link to="" className="mil-card" onClick={(e) => {
                            e.preventDefault(); // Prevent default link behavior
                            openModal(image); // Open modal on image click
                          }}>
                            <div className="mil-cover-frame">
                              <img
                                src={Helpers.serverImage(image.image_path)}
                                alt={image.title || "project"}
                                className="swiper-image" // Adding a class to target the images
                              />
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12">
                      <Link to={`/gallery-images/${category.slug}`} className="mil-link">
                        <span>View More</span>
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })

          )}
        </div>
      </section>

      {/* Modal for displaying the image */}
      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal} style={styles.modalOverlay}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
            style={styles.modalContent}
          >
            <span className="close-btn" onClick={closeModal} style={styles.closeBtn}>
              &times;
            </span>
            <img
              src={Helpers.serverImage(selectedImage.image_path)}
              alt={selectedImage.title || "modal-image"}
              className="modal-image"
              style={styles.modalImage}
            />
          </div>
        </div>
      )}

      {/* Inline styles */}
      <style jsx>{`
        .mil-blog {
          padding: 120px 0;
        }
        .mil-deco {
          position: absolute;
          top: 0;
        }
        .mil-card {
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
        }
        .mil-card:hover {
          transform: scale(1.05);
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          max-width: 90%;
          max-height: 90%;
          overflow: auto;
        }
        .modal-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 30px;
          color: #000;
          cursor: pointer;
        }
        .close-btn:hover {
          color: #ff0000;
        }
      `}</style>
    </>
  );
};

const styles = {
  imageCard: {
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "90%",
    maxHeight: "90%",
    overflow: "auto",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "30px",
    color: "#000",
    cursor: "pointer",
  },
  modalImage: {
    width: "100%",        // Ensure the image occupies the full width of the modal
    height: "auto",       // Maintain aspect ratio
    minWidth: "50vw",    // 800px => 50rem (1rem = 16px by default)
    minHeight: "50vh", // 600px => 37.5rem (1rem = 16px by default)
    maxHeight: "80vh", // 600px => 37.5rem
    objectFit: "cover", // Scale image proportionally inside the box
    borderRadius: "8px",
  },

  "@media (max-width: 1024px)": { // Tablets and below
    modalImage: {
      minWidth: "60vw",   // Adjust to 60% of the viewport width
      minHeight: "50vh",  // Keep the same 50% of the viewport height
      maxHeight: "70vh",  // Adjust max height to 70% of the viewport height
    },
  },

  "@media (max-width: 768px)": { // Tablets and smaller screens (Portrait)
    modalImage: {
      minWidth: "70vw",   // Adjust to 70% of the viewport width
      minHeight: "55vh",  // Increase min height to 55% of the viewport height
      maxHeight: "60vh",  // Limit max height to 60% of the viewport height
    },
  },

  "@media (max-width: 480px)": { // Mobile devices
    modalImage: {
      minWidth: "80vw",   // Adjust to 80% of the viewport width
      minHeight: "60vh",  // Increase min height to 60% of the viewport height
      maxHeight: "50vh",  // Limit max height to 50% of the viewport height
    },
  },

  "@media (max-width: 320px)": { // Very small devices (older or compact phones)
    modalImage: {
      minWidth: "90vw",   // Adjust to 90% of the viewport width
      minHeight: "70vh",  // Increase min height to 70% of the viewport height
      maxHeight: "50vh",  // Limit max height to 50% of the viewport height
    },
  },
};

export default Gallery;
