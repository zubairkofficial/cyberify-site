
import Helpers from "../../Config/Helpers";

import parse from 'html-react-parser';
import { useMemo } from "react";
import { DateTime } from "luxon";

const CaseApproach = ({ project }) => {
    if (!project || !project.approach) {
        return null;  // or a loading spinner, or an error message
    }
    const { firstHtml, remainingHtml } = splitHtmlByWords(project.approach, 120);
    return (

        <div className="row mil-mb-15">
            {project?.approach_thumbnail === null ? (
                // Show Project Overview full width if About The Client is empty
                <div className="col-xl-12">
                    <h2 className="mil-mb-15">
                        <span className="text-primary">●&nbsp;</span>Approach
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: project?.approach }} />
                </div>
            ) : (
                <>
                    <div className="col-xl-6">
                        <h2 className="mil-mb-15">
                            <span className="text-primary">●&nbsp;</span>Approach
                        </h2>
                        <div dangerouslySetInnerHTML={{ __html: firstHtml }} />
                    </div>
                    <div className="col-xl-6 approach-image">
                        <img
                            src={Helpers.serverImage(project?.approach_thumbnail)}
                            alt={`Approach ${project.name}`}
                            className="img-fluid"
                        />
                    </div>

                    {remainingHtml.trim() && (
                        <div className="row mt-4">
                            <div className="col-12">
                                <div dangerouslySetInnerHTML={{ __html: remainingHtml }} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default CaseApproach
