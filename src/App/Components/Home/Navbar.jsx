import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import axios from "axios";

const AppNavbar = () => {
    const location = useLocation();

    const [services, setServices] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isNavbarOpen, setIsNavBarOpen] = useState(false);

    const getServices = () => {
        setLoading(true);
        axios.get(`${Helpers.apiUrl}web/services`, Helpers.authHeaders).then(response => {
            // console.log(response.data);
            setServices(response.data);
            setLoading(false);
        });
    }

    const getIndustries = () => {
        setLoading(true);
        axios.get(`${Helpers.apiUrl}web/industries`, Helpers.authHeaders).then(response => {
            // console.log(response.data);
            setIndustries(response.data.industries);
            // console.log('res',response.data.industries.id);
            setLoading(false);
        });
    }

    useEffect(() => {
        getServices();
        getIndustries();
    }, []);
    const NavbarSwitch = () => {
        setIsNavBarOpen(!isNavbarOpen);
    }

    useEffect(() => {
        setIsNavBarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        getServices();
    }, []);

    return (
        <div className="mil-top-position mil-fixed">
            <div className={`mil-top-panel ${location.pathname === '/' ? 'mil-top-panel-transparent mil-animated' : ''}`}>
                <div className="container">
                    <Link to="/" className="mil-logo" style={{ width: 140 }}></Link>
                    <div className={`mil-navigation ${isNavbarOpen ? 'mil-active' : ''}`}>
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/case-studies">Case Studies</Link></li>
                                <li className="mil-has-children">
                                    <Link to="/#">Industries</Link>
                                    <ul>
                                        {!loading && industries.map(industry => {
                                            return <li key={industry.id}><Link to={`/industry/${industry.industry_slug}`}>{industry.title}</Link></li>;
                                        })}
                                    </ul>
                                </li>
                                <li className="mil-has-children">
                                    <a href="#.">Services</a>
                                    <ul>
                                        {!loading && services.map(service => {
                                            return <li key={service.id}><Link to={`/service/${service.service_slug}`}>{service.name}</Link></li>;
                                        })}
                                    </ul>
                                </li>
                                <li><Link to="/about-cyberify">Company</Link></li>
                                <li><Link to="/contact-us">Contact Us</Link></li>
                                <li className="mil-has-children">
                                    <a href="#.">Other</a>
                                    <ul>
                                        <li><Link to="/insights">Insights</Link></li>
                                        <li><Link to="/careers">Careers</Link></li>
                                        <li><Link to="/gallery">Gallery</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to={'/schedule-consulation'} className="mobile-schedule-btn">Schedule Consultation</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <Link to={'/schedule-consulation'} className="btn-schedule-call">Schedule a Consultation</Link>
                    <div onClick={NavbarSwitch} className={`mil-menu-btn ${isNavbarOpen ? 'mil-active' : ''}`}>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppNavbar;