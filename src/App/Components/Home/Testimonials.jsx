import { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
import axios from "axios";
import Helpers from "../../Config/Helpers";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getReviews = () => {
    setLoading(true);
    axios
      .get(`${Helpers.apiUrl}web/testimonials`, Helpers.authHeaders)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <section className="mil-reviews mil-deep-bg mil-p-120-120">
      <div className="mil-deco" style={{ top: 0, right: "30%" }}></div>
      <div className="container">
        <div className="row align-items-center mil-mb-90">
          <div className="col-md-6 col-xl-6">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30">
              Testimonial
            </span>
            <h2>
              What Our <span className="mil-accent">Clients</span> Say
            </h2>
          </div>
          <div className="col-md-6 col-xl-6">
            <div className="mil-adaptive-right mil-mt-60-adapt">
              <div className="mil-slider-nav">
                <div className="mil-slider-btn-prev mil-revi-prev">
                  <i className="fas fa-arrow-left"></i>
                  <span className="mil-h6">Prev</span>
                </div>
                <div className="mil-slider-btn-next mil-revi-next">
                  <span className="mil-h6">Next</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-container mil-revi-slider">
          
          <div className="swiper-wrapper">
            {!loading &&
              reviews.map((review) => (
                <SingleReview key={review.id} review={review} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
