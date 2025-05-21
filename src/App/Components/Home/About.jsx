import { Link } from "react-router-dom";
import Helpers from "../../Config/Helpers";

const AboutSection = () => {
    return (
        <section className="mil-awards">
            <div className="row m-0">
                <div className="col-xl-6 p-0 mil-relative">
                {/* style="object-position: center" */}
                    <img src={Helpers.staticImage('img/photo/9.jpg')} className="mil-background-image" style={{ objectPosition: 'center' }} data-swiper-parallax-scale="1.1" alt="image" />
                    <div className="mil-overlay"></div>

                    <div className="mil-fake-container">
                        <span className="mil-suptitle mil-suptitle-2 mil-light mil-mb-30">About Cyberify</span>
                        <h2 className="mil-light mil-mb-30">Empowering Business Success <span className="mil-accent"> Together.</span></h2>
                        <p className="mil-light-soft mil-mb-30"  style={{textAlign:"justify"}}>We specialize in delivering innovative, high-quality AI solutions that empower businesses to achieve their goals. Our team of experts combines cutting-edge technology with deep industry knowledge to provide tailored web and mobile applications. We are dedicated to building powerful, intuitive solutions that optimize business processes and improve decision-making.</p>
                        <Link to="/about-cyberify" className="mil-link"><span className="mil-light">About us</span><i className="fas fa-arrow-right"></i></Link>
                    </div>

                </div>
                <div className="col-xl-6 p-0">

                    <div className="row m-0">
                        <div className="col-md-6 col-xl-6 p-0">

                            <div className="mil-awards-box mil-gradient-bg">
                                <div className="mil-icon-box mil-center">
                                    <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                                        <img className="service-icon" src={Helpers.staticImage('images/expert-team.png')} alt="icon" />
                                    </div>
                                    <h3 className="mil-light mil-mb-20">Expert Team</h3>
                                    <p className="mil-text-sm mil-light-soft">Skilled professionals committed to delivering innovative solutions.</p>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6 col-xl-6 p-0">

                            <div className="mil-awards-box mil-box-2 mil-gradient-bg">
                                <div className="mil-icon-box mil-center">
                                    <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                                        <img className="service-icon" src={Helpers.staticImage('images/performance.png')} alt="icon" />
                                    </div>
                                    <h3 className="mil-light mil-mb-20">Performance Optimization</h3>
                                    <p className="mil-text-sm mil-light-soft">Solutions focused on enhancing productivity and efficiency.</p>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6 col-xl-6 p-0">

                            <div className="mil-awards-box mil-gradient-bg">
                                <div className="mil-icon-box mil-center">
                                    <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                                        <img className="service-icon" src={Helpers.staticImage('images/collaboration.png')} alt="icon" />
                                    </div>
                                    <h3 className="mil-light mil-mb-20">Client Collaboration</h3>
                                    <p className="mil-text-sm mil-light-soft">A collaborative approach keeps clients involved and satisfied throughout.</p>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6 col-xl-6 p-0">

                            <div className="mil-awards-box mil-box-2 mil-pb-60-adapt mil-gradient-bg">
                                <div className="mil-icon-box mil-center">
                                    <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                                        <img className="service-icon" src={Helpers.staticImage('images/quality.png')} alt="icon" />
                                    </div>
                                    <h3 className="mil-light mil-mb-20">Quality Assurance</h3>
                                    <p className="mil-text-sm mil-light-soft">Rigorous testing protocols ensure our solutions meet the highest standards.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default AboutSection;