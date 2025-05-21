import { Link } from "react-router-dom";
import Helpers from "../../Config/Helpers";

const UseCase = ({ usecase, isReverse = false }) => {
    return (
        <div className={`row ${isReverse ? 'flex-sm-row-reverse' : ''} justify-content-between align-items-center`}>
            <div className="col-xl-6 mil-mb-60">
                <div className="mil-project-cover">
                    <img src={Helpers.serverImage(`${usecase.thumbnail}`)} alt="Project" />
                </div>
            </div>
            <div className="col-xl-5 mil-mb-60">
                <span className="mil-suptitle mil-suptitle-2 mil-mb-30">{usecase.short_description}</span>
                <h2 className="mil-mb-30">{usecase.name}</h2>
                <Link to={`/case-study/${usecase.slug}`} className="mil-button-with-label">
                    <div className="mil-button mil-border mil-icon-button"><span><i className="fas fa-plus"></i></span></div><span className="mil-dark">See More</span>
                </Link>
            </div>
        </div>
    );
}

export default UseCase;