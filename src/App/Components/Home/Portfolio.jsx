import { useEffect, useState } from "react";
import PortfolioItem from "./PortfolioItem";
import axios from 'axios';
import Helpers from "../../Config/Helpers";
import { Link } from "react-router-dom";

const Portfolio = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProjects = () => {
        setLoading(true);
        axios.get(`${Helpers.apiUrl}web/all-usecases`, Helpers.authHeaders).then(response => {
            setProjects(response.data);
            setLoading(false);
        });
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <section className="mil-works mil-p-120-90">
            <div className="mil-deco" style={{ top: 0, right: '40%' }}></div>
            <div className="container">
                <div className="row align-items-center mil-mb-60-adapt">
                    <div className="col-md-6 col-xl-6">
                        <h2 className="mil-mb-30">Latest Projects</h2>
                    </div>
                    <div className="col-md-6 col-xl-6">
                        <div className="mil-adaptive-right">
                            <div className="mil-slider-nav mil-mb-30">
                                <div className="mil-slider-btn-prev mil-works-prev"><i className="fas fa-arrow-left"></i><span className="mil-h6">Prev</span></div>
                                <div className="mil-slider-btn-next mil-works-next"><span className="mil-h6">Next</span><i className="fas fa-arrow-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="swiper-container mil-works-slider mil-mb-90">
                    <div className="swiper-wrapper">
                        {!loading && projects.reverse().map((project, index) => {
                            // if(index <= 3){
                                return (
                                    <div key={project.id} className="swiper-slide">
                                        <PortfolioItem project={project} />
                                    </div>
                                )
                            // }
                        })}
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-6 col-xl-6">
                        <Link to="/case-studies" className="mil-link mil-mb-30"><span>View All Cases</span><i className="fas fa-arrow-right"></i></Link>
                    </div>
                    <div className="col-md-6 col-xl-6">
                        <div className="mil-adaptive-right">
                            <Link to="/contact-us" className="mil-button mil-border mil-mb-30"><span>Get Started</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Portfolio;