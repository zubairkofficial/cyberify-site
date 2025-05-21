import Helpers from "../../Config/Helpers";
import KeyPoints from "./KeyPoints";
// 
import parse from 'html-react-parser';
import { useMemo } from "react";
import { DateTime } from "luxon";

function splitHtmlByWords(html, wordLimit = 100) {
    if (!html) return { firstHtml: '', remainingHtml: '' };

    // Create a temporary container to parse the HTML
    const container = document.createElement('div');
    container.innerHTML = html;
    let wordCount = 0;
    const firstPart = document.createElement('div');
    const remainingPart = document.createElement('div');
    let currentParent = firstPart;

    // Helper function to check whether the node's content can fit in the first part
    function canFitInFirstPart(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (text) {
                const words = text.split(/\s+/);
                return wordCount + words.length <= wordLimit;
            }
        }
        return true; // For element nodes, they can always fit in the first part
    }

    // Function to process each node
    function processNode(node) {
        if (wordCount >= wordLimit) {
            // Move remaining nodes to the remaining part
            remainingPart.appendChild(node.cloneNode(true));
            return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (text) {
                const words = text.split(/\s+/);
                if (wordCount + words.length <= wordLimit) {
                    // Full text fits in first part
                    currentParent.appendChild(document.createTextNode(text + ' '));
                    wordCount += words.length;
                } else {
                    // Need to split the text
                    const remainingWords = wordLimit - wordCount;
                    const firstText = words.slice(0, remainingWords).join(' ');
                    const remainingText = words.slice(remainingWords).join(' ');
                    currentParent.appendChild(document.createTextNode(firstText + ' '));
                    wordCount = wordLimit;
                    // Switch to remaining part
                    currentParent = remainingPart;
                    currentParent.appendChild(document.createTextNode(remainingText + ' '));
                }
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Handle element nodes (preserve structure)
            const clone = node.cloneNode(false); // Shallow clone (no children)

            // Special handling for list items and block elements
            if (node.nodeName === 'li' || node.nodeName === 'p' || node.nodeName === 'h1' || node.nodeName === 'h2' || node.nodeName === 'h3' || node.nodeName === 'h4' || node.nodeName === 'h5' || node.nodeName === 'h6') {
                if (canFitInFirstPart(node)) {
                    currentParent.appendChild(clone);
                    const savedParent = currentParent;
                    currentParent = clone;
                    Array.from(node.childNodes).forEach(child => processNode(child));
                    currentParent = savedParent;
                } else {
                    // Move entire element to the remaining part
                    remainingPart.appendChild(clone);
                    const savedParent = currentParent;
                    currentParent = clone;
                    Array.from(node.childNodes).forEach(child => processNode(child));
                    currentParent = savedParent;
                }
            } else {
                // Non-block elements are treated normally
                currentParent.appendChild(clone);
                const savedParent = currentParent;
                currentParent = clone;
                Array.from(node.childNodes).forEach(child => processNode(child));
                currentParent = savedParent;
            }
        }
    }

    // Process all top-level nodes
    Array.from(container.childNodes).forEach(processNode);

    return {
        firstHtml: firstPart.innerHTML,
        remainingHtml: remainingPart.innerHTML
    };
}



const CaseOverview = ({ project }) => {

    
    if (!project || !project.approach) {
        return (
                <section className="mil-p-120-90">
            <div className="container">
                <div className="row mil-mb-15">
                    <h3 className="text-primary">{project.service}</h3>
                </div>
                <div className="row justify-content-between mil-mb-15">
                    <div className="col-xl-5">
                        {/* <h2>Approach</h2> */}
                        <h2>Challenges</h2>
                        <p className="text-description">{project.challenge}</p>
                    </div>
                    <div className="col-xl-6">
                        <h2>Results</h2>
                        <p className="text-description">{project.result}</p>

                    </div>
                </div>
                <div className="row justify-content-between mil-mb-15">
                    <div className="col-xl-5">
                        <h2>Solutions</h2>
                        <p className="text-description">{project.solution}</p>
                    </div>
                    <div className="col-xl-6">
                        <h2>Industry</h2>
                        <p className="text-description">{project.industry}</p>

                    </div>
                </div>

                <div className="mil-divider mil-mt-60 mil-mb-60 use-case-mil-divider"></div>
                <div className="row mil-mb-15">
                    {project.about_the_client === null || project.about_the_client?.trim().length === 0 ? (
                        // Show Project Overview full width if About The Client is empty
                        <div className="col-xl-12">
                            <h2 className="mil-mb-15">
                                <span className="text-primary">●&nbsp;</span>Project/Case Overview
                            </h2>
                            <p className="text-description" style={{ width: "95%" }}>
                                {project.project_overview}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="col-xl-6">
                                <h2 className="mil-mb-15">
                                    <span className="text-primary">●&nbsp;</span>Project/Case Overview
                                </h2>
                                <p className="text-description" style={{ width: "95%" }}>
                                    {project.project_overview}
                                </p>
                            </div>
                            <div className="col-xl-6">
                                <h2 className="mil-mb-15">
                                    <span className="text-primary">●&nbsp;</span>About The Client
                                </h2>
                                <p className="text-description">{project.about_the_client}</p>
                            </div>
                        </>
                    )}
                </div>

                <div className="row mil-mt-30">
                    <div className="col-xl-12">
                        <div className="mil-use-case-overview">
                            <img src={Helpers.serverImage(`${project.challenge_image}`)} alt="Project" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
        )
    }

const { firstHtml, remainingHtml } = useMemo(() => {
    return splitHtmlByWords(project.approach, 120);
}, [project.approach]);

    return (
        <section className="mil-p-120-90">
            <div className="container">
                <div className="row mil-mb-15">
                    <h3 className="text-primary">{project.service}</h3>
                </div>
                <div className="row justify-content-between mil-mb-15">
                    <div className="col-xl-5">
                        {/* <h2>Approach</h2> */}
                        <h2>Challenges</h2>
                        <p className="text-description">{project.challenge}</p>
                    </div>
                    <div className="col-xl-6">
                        <h2>Results</h2>
                        <p className="text-description">{project.result}</p>

                    </div>
                </div>
                <div className="row justify-content-between mil-mb-15">
                    <div className="col-xl-5">
                        <h2>Solutions</h2>
                        <p className="text-description">{project.solution}</p>
                    </div>
                    <div className="col-xl-6">
                        <h2>Industry</h2>
                        <p className="text-description">{project.industry}</p>

                    </div>
                </div>

                <div className="mil-divider mil-mt-60 mil-mb-60 use-case-mil-divider"></div>
                <div className="row mil-mb-15">
                    {project.about_the_client === null || project.about_the_client?.trim().length === 0 ? (
                        // Show Project Overview full width if About The Client is empty
                        <div className="col-xl-12">
                            <h2 className="mil-mb-15">
                                <span className="text-primary">●&nbsp;</span>Project/Case Overview
                            </h2>
                            <p className="text-description" style={{ width: "95%" }}>
                                {project.project_overview}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="col-xl-6">
                                <h2 className="mil-mb-15">
                                    <span className="text-primary">●&nbsp;</span>Project/Case Overview
                                </h2>
                                <p className="text-description" style={{ width: "95%" }}>
                                    {project.project_overview}
                                </p>
                            </div>
                            <div className="col-xl-6">
                                <h2 className="mil-mb-15">
                                    <span className="text-primary">●&nbsp;</span>About The Client
                                </h2>
                                <p className="text-description">{project.about_the_client}</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="row mil-mb-15">
                    {project?.approach_thumbnail === null ? (
                        // Show Project Overview full width if About The Client is empty
                        <div className="col-xl-12">
                            <h2 className="mil-mb-15">
                                <span className="text-primary">●&nbsp;</span>Approach
                            </h2>
                            <div className="text-description" dangerouslySetInnerHTML={{ __html: project?.approach }} />
                        </div>
                    ) : (
                        <>
                            <div className="col-xl-6">
                                <h2 className="mil-mb-15">
                                    <span className="text-primary">●&nbsp;</span>Approach
                                </h2>
                                <div className="text-description" dangerouslySetInnerHTML={{ __html: firstHtml }} />
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
                                        <div className="text-description" dangerouslySetInnerHTML={{ __html: remainingHtml }} />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="row mil-mt-30">
                    <div className="col-xl-12">
                        <div className="mil-use-case-overview">
                            <img src={Helpers.serverImage(`${project.challenge_image}`)} alt="Project" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default CaseOverview;