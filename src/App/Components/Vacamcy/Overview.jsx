import Helpers from "../../Config/Helpers";


const VacancyOverview = ({ vacancy }) => {
    console.log(vacancy)
    return (

            <div className="container">
                {/* <div className="row mil-mb-15">
                    <h1 className="text-primary">{vacancy.job_title}</h1>
                </div> */}
                <div className="row justify-content-between mil-mb-15">
                    <div className="col-xl-5">
                        <h2>Qualification</h2>
                        <p className="text-description">{vacancy.qualification}</p>
                    </div>
                    <div className="col-xl-6">
                        <h2>Experience</h2>
                        <p className="text-description">{vacancy.experience}+ Years</p>

                    </div>
                </div>
                <div className="row justify-content-between mil-mb-15">
                    <div className="col-xl-5">
                        <h2>Deadline</h2>
                        <p className="text-description">{vacancy.deadline}</p>
                    </div>
                    <div className="col-xl-6">
                        <h2>Type</h2>
                        <p className="text-description">{vacancy.type} - {vacancy.location}</p>

                    </div>
                </div>

                <div className="mil-divider mil-mt-60 mil-mb-60 use-case-mil-divider"></div>
                <div className="row mil-mb-15">
                    <div className="col-xl-12">
                        <h2 className="mil-mb-15"><span className="text-primary">●&nbsp;</span>Job Description</h2>
                        {/* <p className="text-description" style={{ width:"95%" }}>{}</p> */}
                        <span style={{ width: "95%" }} dangerouslySetInnerHTML={{ __html: vacancy.description }} />
                    </div>
                </div>
                <div className="mil-divider mil-mt-60 mil-mb-60 use-case-mil-divider"></div>
                <div className="row mil-mb-15">
                    <div className="col-xl-12">
                        <h2 className="mil-mb-15"><span className="text-primary">●&nbsp;</span>Skills Required</h2>
                        <div className="skills-container">
                            {vacancy.skills.map((skill, index) => (
                                <div className="skill-card" key={index}>
                                    <div className="skill-content">
                                        <p className="skill-text">{skill}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <style jsx>{`
        p{
         color: #7E7E7E !important;
        }
                 p span{
         color: #7E7E7E !important;
         }
         `}</style>
            </div>
    );
}

export default VacancyOverview;