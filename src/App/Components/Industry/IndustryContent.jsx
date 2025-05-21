import React from "react";
import IndustryMainContent from "./IndustryMainContent";
import IndustryTableOfContent from "./IndustryTableOfContent";
import { Link } from "react-router-dom";
import Sticky from "react-sticky-el";
import NewsletterCard from "./NewsletterCard"; // Assuming this component is imported.

const IndustryContent = ({ tableIntro, tableData, contentIntro, contentData, useCase }) => {
  console.log("Table Intro", tableIntro);
  console.log("Table Data", tableData);
  console.log("Content Intro", contentIntro);
  console.log("Content Data", contentData);

  return (
    <div className="industry-margin row">
      <h5>test test</h5>
      {/* Table of Content only visible on larger screens */}
      <div className="col-md-3 px-0 boundaryelement d-none d-md-block">
        <IndustryTableOfContent tableIntro={tableIntro} tableData={tableData} />
      </div>
      {/* Main Content takes full width on small screens */}
      <div className="col-md-9 col-12 px-0">
        <IndustryMainContent contentIntro={contentIntro} contentData={contentData} useCase={useCase} />
        {/* Sticky NewsletterCard always visible below the content */}
        <div className="d-block d-md-none mt-4">
          <Sticky boundaryElement=".boundaryelement" hideOnBoundaryHit={true}>
            <NewsletterCard />
          </Sticky>
        </div>
      </div>
    </div>
  );
};

export default IndustryContent;

// import React from "react";
// import IndustryMainContent from "./IndustryMainContent";

// import IndustryTableOfContent from "./IndustryTableOfContent";

// import { Link } from "react-router-dom";
// const IndustryContent = ({tableIntro,tableData,contentIntro,contentData,useCase}) => {
//   console.log("Table Intro",tableIntro)
//   console.log("Table Data",tableData)
//   console.log("Content Intro",contentIntro)
//   console.log("Content Data",contentData)
//   return (
//     <div className="industry-margin row">
//       <div className="col-md-3 px-0 boundaryelement" >
//         <IndustryTableOfContent tableIntro={tableIntro} tableData={tableData}/>
//       </div>
//       <div className="col-md-9 px-0">
//         <IndustryMainContent contentIntro={contentIntro} contentData={contentData} useCase={useCase}/>
//       </div>
//     </div>
//   );
// };

// export default IndustryContent;
