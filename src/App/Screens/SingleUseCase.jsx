import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import PageBanner from "../Components/Banner";
import PageBannerNew from "../Components/BannerNew";
import axios from "axios";
import Helpers from "../Config/Helpers";
import Divider from "../Components/Home/Divider";
import CaseChallenge from "../Components/Case/Challenge";
import CaseOverview from "../Components/Case/Overview";
import CaseBenefits from "../Components/Case/Benefits";
import CaseConclusions from "../Components/Case/Conclusions";
import CaseProperties from "../Components/Case/Properties";
import CallToAction from '../Components/CallToAction';
import { Helmet } from "react-helmet";


const SingleUseCase = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const location = useLocation(); // Get the current location
    const canonicalUrl = `https://www.cyberify.co${location.pathname}`;
    const getProject = async ()  =>  {
        setLoading(true);
        await axios.get(`${Helpers.apiUrl}web/single-usecase/${slug}`, Helpers.authHeaders).then(response => {
            setProject(response.data);
            setLoading(false);
        });
    }

    useEffect(() => {
        // Check if slug is a number
        if (!isNaN(slug)) {
            navigate('/');
        } else {
            getProject();
        }
    }, [slug]);


    return (
        <>
            <Helmet>
                <title>{`${project.short_description} - Cyberify`}</title>
                <link rel="canonical" href={canonicalUrl} />
            </Helmet>
            <div></div>
            {/* <PageBanner pageName={loading ? 'Loading Case Study' : project.name} bannerImage={project.thumbnail} description={project.short_description}>
                <Link to="/case-studies" className="mil-link link-left mil-mb-30"><i className="fas fa-arrow-left"></i><span>All Cases</span></Link>
            </PageBanner> */}
            <PageBannerNew Name={loading ? 'Loading Case Study' : project.short_description} bannerImage={project.thumbnail}>
                <Link to="/case-studies" className="mil-link link-left mil-mb-30"><i className="fas fa-arrow-left"></i><span>All Cases</span></Link>
            </PageBannerNew>
            {!loading && <CaseOverview project={project} />}
            {!loading && <CaseProperties  properties={project.usecase_keypoints} />}
            <CallToAction />
            {!loading && <CaseBenefits benefitsImage={project.solution_image} benefits={project.usecase_achievements} />}
            {/* <Divider />
            {!loading && <CaseChallenge project={project} />}
            <Divider />
            {(!loading && project.usecase_achievements) && <CaseConclusions achievements={project.usecase_achievements} />} */}
        </>
    )
}

export default SingleUseCase;