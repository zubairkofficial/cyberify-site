import React from "react";
import SingleProperty from "./SingleProperty";

const Properties = ({ challenge, properties }) => {
  console.log("peroprties",properties);
  return (
    
    <section className="mil-p-0-120">
      <style>
        {`
            .property-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr); 
              gap: 30px; /* Adjust the gap between items as needed */
            }
  
            @media (max-width: 1024px) { /* Tablet breakpoint */
              .property-grid {
                grid-template-columns: repeat(2, 1fr); /* 2 items per row on tablets */
              }
            }
  
            @media (max-width: 768px) {
              .property-grid {
                grid-template-columns: 1fr; /* 1 item per row on mobile devices */
              }
            }
          `}
      </style>
      <div className="container">
        <h2 className="mb-4">Properties</h2>
        <div className="property-grid">
        {properties && properties.map((property, index) => (
          <SingleProperty
            key={property.id} // Unique key for each component
            counter={`0${index + 1}`} // Counter value based on the index
            text={property.point} // The text for each property
          />
        ))}
        </div>
      </div>
    </section>
    
  );
};

export default Properties;
