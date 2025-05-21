import { useEffect, useState } from "react";
import Helpers from "../../Config/Helpers";
import SingleService from "./SingleService";
import axios from 'axios';

const Services = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    const getServices = () => {
        setLoading(true);
        axios.get(`${Helpers.apiUrl}web/services`, Helpers.authHeaders).then(response => {
            console.log(response.data);
            setServices(response.data);
            setLoading(false);
        });
    }

    useEffect(() => {
        getServices();
    }, []);

    return (
        <section className="mil-services mil-p-120-90">
            <div className="mil-deco" style={{ top: 0, right: '20%' }}></div>
            <div className="container">
                <h2 className="mil-mb-30">How We Can <span className="mil-accent">Help You</span></h2>
                <div className="row">
                    {!loading && services.map(service => {
                        return <SingleService key={service.id} service_slug={service.service_slug} image={service.image} title={service.name} description={service.description} />
                    })}
                </div>
            </div>
        </section>
    );
}

export default Services;