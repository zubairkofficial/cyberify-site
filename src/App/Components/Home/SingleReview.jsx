import Helpers from "../../Config/Helpers";

const SingleReview = ({review}) => {
    return (
        <div className="swiper-slide">
            <div className="mil-review">
                <div className="mil-stars mil-mb-30">
                    <img src={Helpers.staticImage('img/icons/sm/11.svg')} alt="quote" />
                    <ul>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                        <li><i className="fas fa-star"></i></li>
                    </ul>
                </div>
                <p className="mil-mb-30"  style={{textAlign:"justify"}}>{ review.review }</p>
                <div className="mil-author">
                    <img src={Helpers.serverImage(`clients/${review.client_picture}`)} alt="Customer" />
                    <div className="mil-name">
                        <h6 className="mil-mb-5">{ review.client_name }</h6>
                        <span className="mil-text-sm">{ review.company }</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleReview;