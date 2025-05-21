import { Link } from "react-router-dom";
import Helpers from "../../Config/Helpers";

const HomeHero = () => {
    return (
        <div className="mil-banner mil-top-space-0">
            <div className="swiper-container mil-banner-slideshow">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <img src={Helpers.staticImage('slide1.webp')} className="mil-background-image" style={{objectPosition: 'center'}} data-swiper-parallax="-100" data-swiper-parallax-scale="1.1" alt="image" />
                    </div>
                    <div className="swiper-slide">
                        <img src={Helpers.staticImage('slide2.webp')} className="mil-background-image" style={{objectPosition: 'center'}} data-swiper-parallax="-100" data-swiper-parallax-scale="1.1" alt="image" />
                    </div>
                    <div className="swiper-slide">
                        <img src={Helpers.staticImage('slide3.webp')} className="mil-background-image" style={{objectPosition: 'center'}} data-swiper-parallax="-100" data-swiper-parallax-scale="1.1" alt="image" />
                    </div>
                </div>
            </div>
            <div className="mil-overlay"></div>
            <div className="mil-banner-content">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-8">
                            <span className="mil-suptitle mil-mb-60"><span className="mil-light">At </span> <span className="mil-accent">Cyberify</span></span>
                            <h1 className="mil-mb-60"><span className="mil-uppercase mil-light">Redefine Your Business<br />Growth with Tailored </span> <span className="mil-accent">AI Applications</span></h1>
                            <div className="mil-flex-hori-center">
                                <div>
                                    <Link to="/schedule-consulation" className="mil-button mil-border mil-light"><span>Schedule Consultation</span></Link>
                                </div>
                                <p className="mil-button-descr mil-light-soft">Crafting innovative AI-powered web and mobile applications to transform your business growth and efficiency.</p>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="mil-illustration-1">
                                <div className="mil-item mil-item-1">
                                    <div className="mil-plus">
                                        <div className="mil-hover-window">
                                            <div className="mil-window-content">
                                                <h3 className="mil-dark mil-mb-15">Customized AI Solutions</h3>
                                                <div className="mil-divider mil-divider-left mil-mb-15"></div>
                                                <p className="mil-text-sm">Tailor-made AI applications that align with your business goals and operational workflows.</p>
                                            </div>
                                        </div>
                                        <div className="mil-item-hover">
                                            <div className="mil-plus-icon">+</div>
                                            <h2 className="mil-light">AI Solutions</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="mil-item mil-item-2">
                                    <div className="mil-plus">
                                        <div className="mil-hover-window">
                                            <div className="mil-window-content">
                                                <h3 className="mil-dark mil-mb-15">Advanced Analytics & Reporting</h3>
                                                <div className="mil-divider mil-divider-left mil-mb-15"></div>
                                                <p className="mil-text-sm">Data-driven insights and detailed reports using AI to refine your strategies and improve decision-making.</p>
                                            </div>
                                        </div>
                                        <div className="mil-item-hover">
                                            <div className="mil-plus-icon">+</div>
                                            <h2 className="mil-light">Analytics & Reporting</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="mil-item mil-item-3">
                                    <div className="mil-plus">
                                        <div className="mil-hover-window">
                                            <div className="mil-window-content">
                                                <h3 className="mil-dark mil-mb-15">AI-Powered Automation</h3>
                                                <div className="mil-divider mil-divider-left mil-mb-15"></div>
                                                <p className="mil-text-sm">Intelligent automation systems designed to streamline processes, reduce costs, and enhance productivity.</p>
                                            </div>
                                        </div>
                                        <div className="mil-item-hover">
                                            <div className="mil-plus-icon">+</div>
                                            <h2 className="mil-light">Automations</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeHero;