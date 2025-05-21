import React from "react";
import { Link } from "react-router-dom";

const IndustryMainContent = ({ contentIntro, contentData, useCase }) => {
  console.log("asddsadsa", useCase);
  const introParts = contentIntro.content.split("\n" ?? "");

  return (
    <div>
      <div>
        <h3 id={`${contentIntro.id}`} className="mb-2">
          {contentIntro.heading}
        </h3>
        {introParts.map((description, index) => (
          <p key={index} className="industry-para mb-2">
            {description}
          </p>
        ))}
      </div>

      <div>
        {contentData.map((section, index) => (
          <div key={section.id} style={{ marginBottom: "20px" }}>
            <h3 className="mb-2" id={section.id}>
              {section.heading}
            </h3>

            {/* Render Section Data */}
            <p className="industry-para mb-4">{section?.sectionsData}</p>

            {/* If there are subsections, render them first */}
            {section.subsections && section.subsections.length > 0
              ? section.subsections.map((subsection) => (
                  <div id={`${subsection.id}`} key={subsection.id}>
                    <p className="industry-para mb-4">
                      <span style={{ fontWeight: "600", color: "gray" }}>
                        {subsection.subheading}:{" "}
                      </span>
                      {subsection.content}
                    </p>
                  </div>
                ))
              : ""}
            {index === contentData.length - 1 && (
              <div className="use-case-list d-flex gap-4">
                {useCase.map((useCasee) => (
                  <div key={useCasee.id} className="use-case-item ">
                    <span
                      className="industry-para mb-4"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <Link
                        className="industry-para"
                        to={`/case-study/${useCasee.id}`}
                        style={{
                          color: "#f57c00",
                          fontWeight: "500",
                          display: "inline",
                        }}
                      >
                        {useCasee.name}
                      </Link>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryMainContent;
