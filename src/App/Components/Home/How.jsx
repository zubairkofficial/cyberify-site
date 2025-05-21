import { Link } from "react-router-dom";
import Helpers from "../../Config/Helpers";

const HowItWorks = () => {
    return (
        <section className="mil-how-it-works mil-deep-bg mil-p-120-90">
            <div className="mil-deco" style={{ top: 0, right: '20%' }}></div>
            <div className="mil-deco" style={{ bottom: 0, right: '20%', transform: 'rotate(180deg)' }} ></div>
            <div className="container">
                <span className="mil-suptitle mil-suptitle-2 mil-mb-30">Discover Our Company</span>
                <h2 className="mil-mb-90">How We <span className="mil-accent">Collaborate</span> With You</h2>
                <div className="row">
                    <div className="col-md-6 col-xl-3">

                        <div className="mil-mb-60">
                            <div className="mil-icon-box-head mil-mb-30">
                                <div className="mil-icon-frame mil-icon-frame-sm">
                                    <img src={Helpers.staticImage('images/step1.png')} className="web-icon" alt="icon" />
                                </div>
                                <h3>Understanding Your Vision</h3>
                            </div>
                            <p style={{textAlign:"justify"}}>Collaborate to analyze your unique needs and set clear project goals aligned with your vision.</p>
                        </div>

                    </div>
                    <div className="col-md-6 col-xl-3">

                        <div className="mil-mb-60">
                            <div className="mil-icon-box-head mil-mb-30">
                                <div className="mil-icon-frame mil-icon-frame-sm">
                                    <img src={Helpers.staticImage('images/step2.png')} className="web-icon" alt="icon" />
                                </div>
                                <h3>Tailored Solution Design</h3>
                            </div>
                            <p  style={{textAlign:"justify"}}>Craft custom AI strategies and prototypes that seamlessly fit your business requirements.</p>
                        </div>

                    </div>
                    <div className="col-md-6 col-xl-3">

                        <div className="mil-mb-60">
                            <div className="mil-icon-box-head mil-mb-30">
                                <div className="mil-icon-frame mil-icon-frame-sm">
                                    <img src={Helpers.staticImage('images/step3.png')} className="web-icon" alt="icon" />
                                </div>
                                <h3>Agile System Development</h3>
                            </div>
                            <p  style={{textAlign:"justify"}}>Develop your solution with flexible, iterative approaches ensuring timely progress and your feedback.</p>
                        </div>

                    </div>
                    <div className="col-md-6 col-xl-3">

                        <div className="mil-mb-60">
                            <div className="mil-icon-box-head mil-mb-30">
                                <div className="mil-icon-frame mil-icon-frame-sm">
                                    <img src={Helpers.staticImage('images/step4.png')} className="web-icon" alt="icon" />
                                </div>
                                <h3>Quality Delivery & Support</h3>
                            </div>
                            <p  style={{textAlign:"justify"}}>Implement, test, and refine the final product, providing ongoing support to guarantee lasting success.</p>
                        </div>

                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-6 col-xl-6">

                        <Link to="/about-cyberify" className="mil-link mil-mb-30"><span>Learn More</span><i className="fas fa-arrow-right"></i></Link>

                    </div>
                    <div className="col-md-6 col-xl-6">

                        <div className="mil-adaptive-right">
                            <Link to="/about-cyberify" className="mil-button mil-border mil-mb-30"><span>How We Work</span></Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;