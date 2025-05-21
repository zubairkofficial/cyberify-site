import Helpers from "../../Config/Helpers";

const CaseChallenge = ({ project }) => {
    return (
        <section className="mil-p-120-60">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-xl-5 mil-mb-60">
                        <h2 className="mil-mb-30">The Challenge</h2>
                        <p className="mil-mb-30">{ project.challenge }</p>
                    </div>
                    <div className="col-xl-6 mil-mb-60">
                        <div className="mil-project-cover">
                            <img src={Helpers.serverImage(`${ project.challenge_image }`)} alt="Project" />
                        </div>
                    </div>
                </div>
                <div className="row flex-sm-row-reverse justify-content-between align-items-center">
                    <div className="col-xl-5 mil-mb-60">
                        <h2 className="mil-mb-30">The Solution</h2>
                        <p className="mil-mb-30">{ project.solution }</p>
                    </div>
                    <div className="col-xl-6 mil-mb-60">

                        <div className="mil-project-cover">
                            <img src={Helpers.serverImage(`${ project.solution_image }`)} alt="Project" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default CaseChallenge;