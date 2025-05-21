import Helpers from "../../Config/Helpers";

const SinglePoint = ({ point }) => {
    return (
        <li>
            <img src={Helpers.staticImage('img/icons/sm/12.svg')} alt="icon" />
            <span className="mil-dark">{point}</span>
        </li>
    )
}

const KeyPoints = ({  keypoints = [] }) => {
    return (
        
            <div className="row">
                <div className="col-xl-6">
                    <ul className="mil-check-icon-list mil-mb-15">
                        {keypoints.map((keypoint, index) => {
                            if (index <= 3) {
                                return <SinglePoint key={keypoint.id} point={keypoint.point} />
                            }
                        })}
                    </ul>
                </div>
                {keypoints.length > 4 && <div className="col-xl-6 mil-mb-30">
                    <ul className="mil-check-icon-list">
                        {keypoints.map((keypoint, index) => {
                            if (index > 3 && index <= 7) {
                                return <SinglePoint key={keypoint.id} point={keypoint.point} />
                            }
                        })}
                    </ul>
                </div>}
            </div>

    )
}

export default KeyPoints;