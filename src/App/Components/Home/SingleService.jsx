import Helpers from "../../Config/Helpers";
import {Link} from 'react-router-dom';


const SingleService = ({service_slug, image, title, description}) => {
    return (
        <Link to={`/service/${service_slug}`} className="col-lg-6">
            <div className="mil-divider mil-divider-left"></div>
            <div className="mil-service-item">
                <div className="mil-service-icon">
                    <div className="mil-icon-frame mil-icon-frame-md">
                        <img className="service-icon" src={Helpers.serverImage(`${image}`)} alt="icon" />
                    </div>
                </div>
                <div className="mil-service-text">
                    <h3 className="mil-mb-30">{title}</h3>
                    <p style={{textAlign:"justify"}}>{description}</p>
                </div>
            </div>
        </Link>
    );
}

export default SingleService;