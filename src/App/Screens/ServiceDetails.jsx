import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams,useLocation, useNavigate } from "react-router-dom";
import Helpers from "../Config/Helpers";
import PageBanner from "../Components/Banner";
import Divider from "../Components/Home/Divider";
import ServicePoints from "../Components/Service/ServicePoints";
import HowItWorks from "../Components/Home/How";
import CallToAction from "../Components/CallToAction";
import { Helmet } from "react-helmet";

const ServiceDetails = () => {
    const { service_slug } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState({});
    const [loading, setLoading] = useState(false);
    const location = useLocation(); // Get the current location
    const canonicalUrl = `https://www.cyberify.co${location.pathname}`;
    const getService = () => {
        setLoading(true);
        axios.get(`${Helpers.apiUrl}web/service/${service_slug}`, Helpers.authHeaders).then(response => {
            setService(response.data);
            setLoading(false);
        });
    }

    useEffect(() => {
        if (!isNaN(service_slug)) {
            navigate('/');
        }
        getService();
    }, [service_slug]);

    if (loading) {
        return (
          <div
            style={{ minHeight: "100vh" }}
            className="d-flex align-items-center justify-content-center "
          >
            Loading...
          </div>
        ); 
      }

    return (
        <>
            <Helmet>
                <title>{ `${service.name} - Cyberify` }</title>
                {/* <meta name="title" content={service.name} />
                <meta name="description" content={service.description} />
                <meta name="audience" content="Everyone" /> */}
                <link rel="canonical" href={canonicalUrl} />
            </Helmet>
             {/* <Helmet>
                    <title>{`Cyberify - ${industry_slug}`}</title>
                    <link rel="canonical" href={canonicalUrl} />
                  </Helmet> */}
            <PageBanner pageName={service.name} description={service.description} />
            <section className="mil-p-120-90">
                <div className="mil-deco" style={{ bottom: 0, right: '20%', transform: 'rotate(180deg)' }} ></div>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-xl-4">

                            <div className="mil-circle-illustration mil-with-dots-2 mil-mb-60" data-swiper-parallax-scale=".8">
                                <div className="mil-circle-bg"></div>
                                <div className="mil-image-frame">
                                    <img src={Helpers.serverImage(service.image2)} alt="img" />
                                </div>
                            </div>

                        </div>
                        <div className="col-xl-7">

                            <h2 className="mil-mb-30">{ service.description }</h2>
                            <div className="mil-hori-box mil-mb-30">
                                <p  style={{textAlign:"justify"}}>{ service.detailed_description }</p>
                            </div>
                            <Link to="/contact-us" className="mil-button mil-border mil-mb-30"><span>Get in Touch</span></Link>
                        </div>
                    </div>
                </div>
            </section>
            <Divider />
            {service.service_points && <ServicePoints service={service} />}
            <CallToAction />
            <HowItWorks />
        </>
    )
}

export default ServiceDetails;