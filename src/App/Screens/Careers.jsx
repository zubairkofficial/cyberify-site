import { Link } from "react-router-dom";
import PageBanner from "../Components/Banner";
import BlogsSection from "../Components/Home/Blogs";
import Partners from "../Components/Home/Partners";
import Helpers from "../Config/Helpers";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useState, useEffect } from "react";


const Careers = () => {
    const [vacancies, setVacancies] = useState([])

    const getVacancies = () => {
        axios
            .get(`${Helpers.apiUrl}web/all-vacancies`, Helpers.authHeaders)
            .then((response) => {
                console.log(response.data)
                setVacancies(response.data)
            })
            .catch((error) => {
                console.error("Error fetching vacancy:", error);
            });
    }

    useEffect(() => {
        getVacancies();
    }, [])

    return (
        <>
            <Helmet>
                <title>Careers - Cyberify</title>
                <link rel="canonical" href="https://www.cyberify.co/careers" />
            </Helmet>
            <PageBanner pageName={"Career at Cyberify"} description="Empower Your Future at Cyberify: Innovate, Inspire, and Impact." />
            <section className="mil-careers mil-p-120-90">
                <div className="container">
                    <div className="row justify-content-between mil-mb-90">
                        <div className="col-xl-6">
                            <h3 className="mil-mb-30">Inspire and Get Inspired by <br /><span className="mil-accent">Professional</span> Experts</h3>
                        </div>
                        <div className="col-xl-4">

                            <p  style={{textAlign:"justify"}}>Explore career opportunities at Cyberify, <span className="mil-accent">where innovation meets growth</span>. Join a dynamic team dedicated to continuous learning, rapid advancement, and a collaborative work culture. At Cyberify, your career thrives alongside cutting-edge technology and meaningful challenges.</p>
                        </div>
                    </div>
                    {(vacancies && vacancies.length > 0) ? (
                        <ul className="mil-vacancies-frame">
                            {vacancies.map((vacancy) => (
                                <li key={vacancy.id} className="mil-vacancy">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4 col-xl-4 mil-mb-30">
                                            <div className="mil-vacancy-head mil-mb-15">
                                                <span className="mil-badge">{vacancy.type}</span>
                                                <span className="mil-text-sm mil-dark">{vacancy.location}</span>
                                            </div>
                                            <h4>{vacancy.job_title}</h4>
                                        </div>
                                        <div className="col-md-6 col-lg-4 col-xl-4 mil-mb-30">
                                            <p  style={{textAlign:"justify"}}>{vacancy.short_description}</p>
                                        </div>
                                        <div className="col-md-12 col-lg-4 col-xl-4 mil-mb-30">
                                            <div className="mil-adaptive-right">
                                                <Link to={`/vacancy/${vacancy.job_slug}`} className="mil-button mil-border">
                                                    <span>Apply Now</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="mil-vacancies-frame">
                            <li className="mil-vacancy">
                                <div className="row">
                                    <div className="col-md-6 col-lg-4 col-xl-4 mil-mb-30">
                                        <h4>We currently don't have any open vacancies. Stay Tuned</h4>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    )}

                </div>
            </section>
            <section className="mil-about mil-deep-bg mil-p-120-0">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-xl-5 mil-mb-60">

                            <span className="mil-suptitle mil-suptitle-2 mil-mb-30">Work With Us</span>
                            <h2 className="mil-mb-30">Why <span className="mil-accent">Choose</span> Us?</h2>
                            <p className="mil-mb-15"  style={{textAlign:"justify"}}>Choose Cyberify because we’re more than just a workplace—we’re a launchpad for your career. With our commitment to continuous learning, you'll stay ahead in the ever-evolving tech world. </p>
                            <p className="mil-mb-50"  style={{textAlign:"justify"}}> Our clear paths to rapid career progression ensure that your hard work pays off. Plus, our collaborative and inclusive culture means you’ll always have a supportive team by your side, helping you thrive every step of the way.</p>
                            <div className="mil-buttons-frame">
                                <Link to={'/about-cyberify'} className="mil-button mil-border"><span>Read more</span></Link>
                            </div>
                        </div>
                        <div className="col-xl-6">

                            <div className="mil-about-illustration-2">
                                <div className="mil-image-frame">
                                    <img src={Helpers.staticImage('why-choose.jpg')} alt="Office" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mil-counters mil-deep-bg mil-p-120-90">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3">

                            <div className="mil-mb-30">
                                <h2 className="mil-mb-20">50+</h2>
                                <div className="mil-divider mil-divider-left mil-mb-30"></div>
                                <p>Successful Projects</p>
                            </div>

                        </div>
                        <div className="col-xl-3">

                            <div className="mil-mb-30">
                                <h2 className="mil-mb-20">100+</h2>
                                <div className="mil-divider mil-divider-left mil-mb-30"></div>
                                <p>Happy Clients</p>
                            </div>

                        </div>
                        <div className="col-xl-3">

                            <div className="mil-mb-30">
                                <h2 className="mil-mb-20">35+</h2>
                                <div className="mil-divider mil-divider-left mil-mb-30"></div>
                                <p>Expert Team Members</p>
                            </div>

                        </div>
                        <div className="col-xl-3">

                            <div className="mil-mb-30">
                                <h2 className="mil-mb-20">20+</h2>
                                <div className="mil-divider mil-divider-left mil-mb-30"></div>
                                <p>Countries in Global Reach</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Partners />
            <BlogsSection />
        </>
    )
}

export default Careers;