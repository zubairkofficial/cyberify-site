import { Link } from "react-router-dom";
import Helpers from "../Config/Helpers";

const CallToAction = () => {
    return (
        <section className="mil-call-to-action mil-p-120-90">
            <div className="mil-deco mil-deco-accent" style={{bottom: '0', right: '35%', transform: "rotate(180deg)"}}></div>
            <img src={Helpers.staticImage("img/photo/15.jpg")} className="mil-background-image" style={{ objectPosition: 'center' }} alt="image" />
            <div className="mil-overlay"></div>
            <div className="container mil-relative">
                <div className="row">
                    <div className="col-lg-6 mil-mb-30">
                        <h3 className="mil-light mil-mb-15">Let’s Discuss <span className="mil-accent">Your</span> Digital <span className="mil-accent">Opportunity.</span></h3>
                        <p className="mil-light-soft">Unlock your digital transformation opportunities now!</p>
                    </div>
                    <div className="col-lg-6 mil-mb-30">
                        <div className="mil-adaptive-right">
                            <Link to="/contact-us" className="mil-button mil-border mil-light"><span>Get Started</span></Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default CallToAction;