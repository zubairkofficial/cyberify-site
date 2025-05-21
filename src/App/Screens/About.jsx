import PageBanner from "../Components/Banner";
import CallToAction from "../Components/CallToAction";
import Partners from "../Components/Home/Partners";
import Testimonials from "../Components/Home/Testimonials";
import Helpers from "../Config/Helpers";
import { Helmet } from 'react-helmet';
const SingleFeature = ({ name, description, path }) => {
    return (
        <>
            <div className="mil-line-icon-box">
                <div className="row align-items-center">
                    <div className="col-xl-2">
                        <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                            <img src={Helpers.staticImage(`${path}`)} alt="icon" />
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <h4 className="mil-mb-30">{name}</h4>
                    </div>
                    <div className="col-xl-6">
                        <p className="mil-box-text mil-mb-30">{description}</p>
                    </div>
                </div>
            </div>
            <div className="mil-divider"></div>
        </>
    );
}

const SingleValue = ({ title, description }) => {
    return (
        <div className="col-md-6 col-xl-4">
            <div className="mil-icon-box-2 mil-mb-60">
                <div className="mil-icon-frame mil-icon-frame-md mil-icon-bg mil-mb-30">
                    <img src={Helpers.staticImage("assets/img/icons/md/10.svg")} alt="icon" />
                </div>
                <div className="mil-box-text">
                    <h4 className="mil-mb-30">{title}</h4>
                    <p className="mil-box-text"  style={{textAlign:"justify"}}>{description}</p>
                </div>
            </div>
        </div>
    )
}

const AboutCyberify = () => {
    const features = [
        { id: 1, name: "Top Expertise", description: "Benefit from a team of industry professionals who bring deep knowledge and hands-on experience to every project.", path: "img/icons/md/6.svg" },
        { id: 2, name: "Quality Management", description: "Enjoy meticulously crafted solutions, adhering to rigorous quality standards, and designed to deliver exceptional results.", path: "img/icons/md/10.svg" },
        { id: 3, name: "Utmost Flexibility", description: "Get tailored strategies that adapt to your unique business needs, ensuring a perfect fit for your goals.", path: "img/icons/md/2.svg" },
        { id: 4, name: "Agility", description: "Experience fast and iterative development processes that keep your project moving efficiently.", path: "img/icons/md/4.svg" },
        { id: 5, name: "Innovation", description: "Leverage the latest technological advancements to unlock new opportunities and stay ahead of the competition.", path: "img/icons/md/5.svg" }
    ];

    const values = [
        { id: 1, name: "We Are", description: "Dedicated professionals committed to building exceptional AI solutions that meet your business goals and exceed your expectations." },
        { id: 2, name: "We Deep Dive", description: "Thoroughly analyzing challenges and opportunities to craft tailored strategies that solve problems and deliver measurable results." },
        { id: 3, name: "We Take", description: "Full responsibility for our work, ensuring every solution meets the highest standards of quality, reliability, and effectiveness." },
        { id: 4, name: "We Value", description: "Trust and collaboration, always fostering transparent relationships that drive mutual growth and success." },
        { id: 5, name: "We Believe", description: "In continuous improvement, embracing innovation to adapt and evolve with changing business landscapes." },
        { id: 6, name: "We Say 'We'", description: "Approaching each project as a partnership, working alongside clients to create a shared vision and achieve common goals." },
    ]

    return (
        <>
            <Helmet>
                <title>About Cyberify - Cyberify</title>
                <link rel="canonical" href="https://www.cyberify.co/about-cyberify" />
            </Helmet>
            <PageBanner pageName={"About Cyberify"} />
            <Partners />
            <section className="mil-p-120-60">
                <div className="mil-deco" style={{ top: 0, left: '25%' }}></div>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="mil-h1">3<span className="mil-accent">+</span></div>
                            <h6 className="mil-mb-60">Years Experience</h6>

                            <h2 className="mil-mb-60">Impressive Milestones Showcasing Our Proven Track Record</h2>
                        </div>
                        <div className="col-lg-6">

                            <h3 className="mil-mb-60"  style={{textAlign:"justify"}}>Explore the numbers that highlight our <span className="mil-accent">Success </span> in delivering exceptional projects, satisfying clients, and <span className="mil-accent">Achieving Global Impact</span></h3>

                            <div className="row">
                                <div className="col-lg-6">

                                    <h6 className="mil-mb-30"><span className="mil-accent">50+</span>&nbsp; Successful Projects</h6>
                                    <div className="mil-divider mil-divider-left mil-mb-60"></div>

                                </div>
                                <div className="col-lg-6">

                                    <h6 className="mil-mb-30"><span className="mil-accent">100+</span>&nbsp; Happy Clients</h6>

                                    <div className="mil-divider mil-divider-left mil-mb-60"></div>

                                </div>
                                <div className="col-lg-6">

                                    <h6 className="mil-mb-30"><span className="mil-accent">35+</span>&nbsp; Expert Team Members</h6>

                                    <div className="mil-divider mil-divider-left mil-mb-60"></div>

                                </div>
                                <div className="col-lg-6">

                                    <h6 className="mil-mb-30"><span className="mil-accent">20+</span>&nbsp; Countries in Global Reach</h6>

                                    <div className="mil-divider mil-divider-left mil-mb-60"></div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="mil-deep-bg mil-p-120-60">
                <div className="mil-deco" style={{ top: 0, left: '15%' }}></div>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-5 mil-mb-60">
                            <div className="mil-circle-illustration">
                                <div className="mil-circle-bg"></div>
                                <div className="mil-image-frame">
                                    <img src={Helpers.staticImage("assets/bhatti-sb.png")} alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mil-mb-60">
                            <span className="mil-suptitle mil-suptitle-2 mil-mb-30">Message from Founder</span>
                            <h2 className="mil-mb-50">Our Mission</h2>
                            <p className="mil-mb-50"  style={{textAlign:"justify"}}>Our mission at Cyberify is to empower businesses to thrive in the digital era by delivering innovative, AI-powered solutions that simplify processes, boost productivity, and provide actionable insights. We believe in fostering strong client relationships, ensuring quality at every step, and offering tailored strategies to help businesses unlock their full potential.</p>
                            <ul className="mil-simple-list">
                                <li>Client-Centric Approach</li>
                                <li>Continuous Innovation</li>
                                <li>Quality Assurance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mil-p-120-120">
                <div className="container">
                    <span className="mil-suptitle mil-suptitle-2 mil-mb-30">Discover Our Company</span>
                    <h2 className="mil-mb-120">Why Work With Us</h2>
                    <div className="mil-divider"></div>
                    {features.map(feature => <SingleFeature key={feature.id} name={feature.name} description={feature.description} path={feature.path} />)}
                </div>
            </section>
            <section className="mil-deep-bg mil-p-120-60">
                <div className="mil-deco" style={{ top: 0, left: '25%' }}></div>
                <div className="container">
                    <h2 className="mil-mb-120">We Live by <span className="mil-accent">Powerful</span> Values</h2>
                    <div className="row">
                        {values.map(value => <SingleValue key={value.id} title={value.name} description={value.description} />)}
                    </div>
                </div>
            </section>
            <CallToAction />
            <Testimonials />
        </>
    );
}

export default AboutCyberify;