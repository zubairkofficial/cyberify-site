import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Helpers from "../../Config/Helpers";
import TextInput from "../../../../../frontend-cyberify/src/App/Components/TextInput";


const SectionContent = ({ content, image, index }) => {


  return (
    <div
      className="section-content-container"
      style={{
        marginBottom: "3rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        textAlign: 'justify',
      }}
    >
      {/* Text Content */}
      <div
        className={image ? "col-md-6" : "col-md-12"}
        style={{
          textAlign: "",
          padding: "0 10px",
          lineHeight: "1.5",
          // color: "black",
        }}
      >
        <div
          className="section-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
        ></div>
      </div>

      {/* Image (If Available) */}
      {image && (
        <div className="col-md-6" style={{ textAlign: "center" }}>
          <img
            src={Helpers.serverImage(image)}
            alt={`Section ${index + 1}`}
            className="img-fluid"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

const SubsectionContent = ({ subsection, index, subIndex }) => {

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);

  const handleResize = () => {
    setIsWideScreen(window.innerWidth > 768);
  };

  // Use useEffect to add an event listener for window resizing
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      key={`${index}-${subIndex}`}
      className="row subsection-item"
      style={{ marginBottom: "3rem" }}
    >
      {(subIndex % 2 === 1 && isWideScreen) ? (
        <>
          {/* Image (If Available) */}
          {subsection.subsectionimage && (
            <div className="col-md-12 subsection-image text-center" >
              <img
                src={Helpers.serverImage(subsection.subsectionimage)}
                alt={`Subsection ${subIndex + 1}`}
                className="img-fluid"
              />
            </div>
          )}
          {/* Subsection Content */}
          <div
            className="col-md-12 subsection-content "
            style={{
              textAlign: "justify",
              padding: "0 15px",
              lineHeight: "1.5",
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subsection.content),
            }}
          ></div>
        </>
      ) : (
        <>
          {/* Subsection Content */}
          <div
            className="col-md-12 subsection-content "
            style={{
              textAlign: "",
              padding: "0 15px",
              lineHeight: "1.5",
              margin: "0", // Ensure no extra margin around content

            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subsection.content),
            }}
          ></div>

          {/* Image (If Available) */}
          {subsection.subsectionimage && (
            <div className="col-md-12 subsection-image text-center">
              <img
                src={Helpers.serverImage(subsection.subsectionimage)}
                alt={`Subsection ${subIndex + 1}`}
                className="img-fluid"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};




const IndustryContent = ({
  industryData,
  industryEmailImage,
  industryEmailData,
}) => {
  if (!industryEmailImage && !industryEmailData) {
    return null;
  }

  return (
    <div>
      {industryData.contentSections.map((section, index) => (
        <div
          key={index}
          id={`section-${index}`}
          className="section-container container mx-auto"
          style={{ margin: "3rem 5rem" }}
        >
          {/* Main Section Content */}
          <SectionContent
            content={section.sectionsData}
            image={section.sectionsImage}
            index={index}
          />

          {/* Subsections */}
          {section.subsections && section.subsections.length > 0 && (
            <div className="subsections-container">
              {section.subsections.map((subsection, subIndex) => (
                <SubsectionContent
                  key={`${index}-${subIndex}`}
                  subsection={subsection}
                  index={index}
                  subIndex={subIndex}
                />
              ))}
            </div>
          )}
        </div>
      ))}
      <style jsx>{`
                 .section-content p span{
         color: #7E7E7E !important;
         }
                 .section-content p {
         text-align:justify !important;
         }
                 .subsection-content p span{
         color: #7E7E7E !important;
         }
                 .subsection-content p {
         text-align:justify !important;
         }
      `}</style>
    </div>
  );
};

export default IndustryContent;
