import { useEffect } from "react";

import Helpers from "../Config/Helpers";
import HomeHero from "../Components/Home/HomeHero";
import Partners from "../Components/Home/Partners";
import Divider from "../Components/Home/Divider";
import Services from "../Components/Home/Services";
import Portfolio from "../Components/Home/Portfolio";
import HowItWorks from "../Components/Home/How";

import axios from 'axios';
import AboutSection from "../Components/Home/About";
import Testimonials from "../Components/Home/Testimonials";
import BlogsSection from "../Components/Home/Blogs";
import { Helmet } from "react-helmet";

const Home = () => {

    const getQueryParams = (parameter) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(parameter);
    }

    const getUser = () => {
        let user_id = getQueryParams('user_id');
        if (user_id) {
            axios.get(`${Helpers.apiUrl}user-login/${user_id}`, Helpers.authHeaders).then(respone => {
                console.log(respone.data);
                localStorage.setItem("user", respone.data);
            });
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Helmet>
                <title>Home - Cyberify</title>
                <link rel="canonical" href="https://www.cyberify.co/" />
            </Helmet>

            <HomeHero />
            <Partners />
            <Divider />
            <Services />
            <Divider />
            <Portfolio />
            <HowItWorks />
            <AboutSection />
            <Testimonials />
            {/* <NewTestimonials /> */}
            <BlogsSection />
        </>
    );
}

export default Home;

