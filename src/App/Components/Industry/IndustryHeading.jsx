import React, { useState } from "react";

function IndustryHeading({ industryData }) {
  const [activeLink, setActiveLink] = useState(0);

  const handleClick = (index) => {
    setActiveLink(index); 
  };
  return (
    <>
      <div
      className="align-items-center py-4 industryheading"
      style={{
        background: '#F4F4F4',
        fontSize: '18px',
        color: '#888888',
        padding: '2rem',
        textAlign: 'justify',
      }}
    >
      <div className="container mx-auto">
        {industryData.contentSections.map((section, index) => (
          <a
            href={`#section-${index}`}
            key={index}
            onClick={() => handleClick(index)} 
            style={{
              marginRight: '7rem',
              color: activeLink === index ? '#F57C00' : '#888888',
            }}
            className=""
          >
            {section.heading}
          </a>
        ))}
        <a
          href="#section-use"
          style={{
            marginRight: '7rem',
            color: activeLink === null ? '#F57C00' : '#888888', 
          }}
          onClick={() => setActiveLink(null)} 
        >
          Use Cases
        </a>
      </div>
    </div>
    </>
  );
}

export default IndustryHeading;
