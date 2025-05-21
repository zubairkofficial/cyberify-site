import { useEffect, useState } from "react";
import PageBanner from "../Components/Banner";
import axios from "axios";
import UseCase from "../Components/Case/UseCase";
import Helpers from "../Config/Helpers";
import { Helmet } from "react-helmet";

const CaseStudies = () => {
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

    if (loading) {
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
                <title>Case Studies - Cyberify</title>
                <link rel="canonical" href="https://www.cyberify.co/case-studies" />
            </Helmet>
            <PageBanner pageName={"Case Studies"} description={"Solutions that integrate smoothly with existing systems."}  />
            <section className="mil-p-120-120">
                <div className="container">
                    {!loading && projects.reverse().map((usecase, index) => {
                        return <UseCase key={index} usecase={usecase} isReverse={index%2 == 1} />
                    })}
                </div>
            </section>
        </>
    );
}

export default CaseStudies;