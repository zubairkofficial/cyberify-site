import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation,useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import Helpers from "../Config/Helpers";
import IndustryHero from "../Components/Industry/IndustryHero";
import IndustryIntro from "../Components/Industry/IndustryIntro";
import IndustryUseCases from "../Components/Industry/IndustryUseCases";
import IndustryHeading from "../Components/Industry/IndustryHeading";
import IndustrySection from "../Components/Industry/IndustrySection";
import CallToAction from "../Components/CallToAction";
import { Helmet } from "react-helmet";

const Industries = () => {
  const [industry, setIndustry] = useState(false); // Initialize with null
  const { industry_slug } = useParams();

  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Get the current location

  const canonicalUrl = `https://www.cyberify.co${location.pathname}`;
  const [industryId, setIndustryId] = useState(null);
  const [industryName, setIndustryName] = useState("");
  const [industryImage, setIndustryImage] = useState("");
  const [industryEmailData, setIndustryEmailData] = useState("");
  const [industryEmailImage, setIndustryEmailImage] = useState("");
  const [industryData, setIndustryData] = useState({});
  const [industryUseCases, setIndustryUseCases] = useState({});
  const [industryBlogs, setIndustryBlogs] = useState({});

  const getIndustry = () => {
    if (industry_slug) {
      axios
        .get(
          `${Helpers.apiUrl}web/industry/${industry_slug}`,
          Helpers.authHeaders
        )
        .then((response) => {
          response.data.industry.industry_data
            ? setIndustryData(JSON.parse(response.data.industry.industry_data))
            : {};
          setIndustryName(response.data.industry.industry_name);
          setIndustryImage(Helpers.serverImage(response.data.industry.featured_image));
          setIndustryEmailImage(response.data.industry.email_image);
          setIndustryEmailData(response.data.industry.email_data);
          setIndustryUseCases(response.data.industry.use_case);
          setIndustryId(response.data.industry.id)
 
          setIndustry(1);
    
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.error("Error fetching industry:", error);
        });
    }
  };

  useEffect(() => {
    // Check if slug is a number
    if (!isNaN(industry_slug)) {
        navigate('/');
    } else {
        getIndustry();
    }
}, [industry_slug]);

  useEffect(() => {
   
    // console.log('industryImage',industryImage)
  }, [industry]);
  // Conditional rendering to avoid errors before industry is loaded
  if (!industry) {
    return (
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex align-items-center justify-content-center "
      >
        Loading...
      </div>
    ); // Show a loading state while data is being fetched
  }

  return (
    <>
      <Helmet>
        <title>{`${industry_slug} - Cyberify`}</title>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div>
        <IndustryHero name={industryName} image={industryImage} />
        {/* <IndustryIntro heroHeading={industryData.heroSection.heading} heroDescription={industryData.heroSection.description}/> */}
        {/* <IndustryContent tableIntro={industryData.tableIntroHeading} tableData={industryData.tableOfContents} contentIntro={industryData.contentIntro} contentData={industryData.contentSections} useCase={industryUseCases}/> */}
        <IndustryHeading industryData={industryData} />

        <IndustrySection
          industryData={industryData}
          industryEmailData={industryEmailData}
          industryEmailImage={industryEmailImage}
        />
        <CallToAction />
        <IndustryUseCases id={industryId} useCasesIds={industryUseCases} />
      </div>
    </>
  );
};

export default Industries;
