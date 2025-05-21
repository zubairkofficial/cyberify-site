import Helpers from "../../Config/Helpers";
import KeyPoints from "./KeyPoints";

import { DateTime } from "luxon";

const CaseBenefits = ({ benefits, benefitsImage }) => {
    console.log(benefits, benefitsImage)
    return (
        <section className="mil-p-120-90">
            <div className="container">
                <div className="row justify-content-between mil-mb-15">
                    <div className="col-xl-6">
                    <div className="mil-use-case-overview">
                            <img style={{ borderRadius:"35px" }} src={Helpers.serverImage(`${ benefitsImage }`)} alt="Project" />
                        </div>
                    </div>
                    <div className="col-xl-6 mt-xl-0 mt-sm-4">
                        <h2>Benefits</h2>
                        {benefits && benefits.map((benefit, index) => (
        <div className="my-3 usecase-benefit" key={index} style={{  }}>
          <span><i className="fa-light fa-chevron-right mr-2 benefit-icon align-items-top mt-1"></i></span>
          <p className="text-description" style={{ fontSize:"1.2em",lineHeight:"1.5em" }}><span style={{ fontWeight: "bold" }}>{benefit.name}:</span>&nbsp;
          {benefit.description}</p>
        </div>
      ))}

                    </div>
                </div>

            </div>
        </section>
    );
}

export default CaseBenefits;