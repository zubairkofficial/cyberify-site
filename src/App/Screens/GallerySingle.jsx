import React, { useEffect, useState } from "react";
import PageBanner from "../Components/Banner";
import Helpers from "../Config/Helpers";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

const GallerySingle = () => {
  const { slug } = useParams();
  const [categoryData, setCategoryData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // State to handle selected image
  const location = useLocation(); // Get the current location
  const canonicalUrl = `https://www.cyberify.co${location.pathname}`;
  const getCategoryData = async () => {
    try {
      const response = await axios.get(
        `${Helpers.apiUrl}web/gallery/${slug}`,
        Helpers.authHeaders
      );
      setCategoryData(response.data); // Set the categories data in state
      console.log("gallery data", response.data);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

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
        <title>{`${categoryData?.name || ""} - Cyberify`}</title>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <PageBanner pageName={`Gallery: ${categoryData?.name || ""}`} />
      <section className="mil-blog mil-p-120-120">
        <div className="mil-deco" style={{ top: 0 }}></div>
        <div className="container">
          <div className="row align-items-center mil-mb-20">
            <div className="d-flex justify-content-between">
              <h2>See All Images</h2>
              <h4 style={{ color: "#f57c00", cursor: "pointer" }}><Link to="/gallery">Go Back</Link></h4>
            </div>
          </div>

          {/* Grid layout for images */}
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {categoryData?.images?.map((image) => (
              <div key={image.id} className="col">
                <div
                  className="mil-card"
                  onClick={() => openModal(image)} // Open modal when image is clicked
                  style={styles.imageCard} // Apply styles here
                >
                  <div className="mil-cover-frame">
                    <img
                      src={Helpers.serverImage(image.image_path)}
                      alt={image.title || "project"}
                      className="img-fluid"
                      style={styles.image} // Style the image
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
  // modalImage: {
  //   width: "100%",
  //   height: "auto",
  //   borderRadius: "8px",
  // },
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

export default GallerySingle;
