import { Link } from "react-router-dom";
import Helpers from "../../Config/Helpers";

const PortfolioItem = ({ project }) => {
    return (
        <Link to={`/case-study/${project.slug}`} className="mil-card">
            <div className="mil-cover-frame">
                <img src={Helpers.serverImage(`${project.thumbnail}`)} alt="project" />
            </div>
            <div className="mil-description">
                <div className="mil-card-title">
                    <h4 className="mil-mb-20">{project.name}</h4>
                    <h5>by: <span className="mil-accent">{project.client_name}</span></h5>
                </div>
                <div className="mil-card-text">
                    <p  style={{textAlign:"justify"}}>{project.short_description}</p>
                </div>
            </div>
        </Link>
    );
}

export default PortfolioItem;