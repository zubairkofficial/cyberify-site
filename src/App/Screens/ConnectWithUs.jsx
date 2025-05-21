import React from 'react'
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import PageBanner from "../Components/Banner";
import ConnectionLinks from '../Components/ConnectWithUs/ConnectionLinks';


const ConnectWithUs = () => {
    return (
        <>
            <Helmet>
                <title>Connect With Us - Cyberify</title>
                <link rel="canonical" href="https://www.cyberify.co/connect-with-us" />
            </Helmet>
            <PageBanner pageName={"Connect With Us"} />
            <ConnectionLinks/>
        </>
    )
}

export default ConnectWithUs
