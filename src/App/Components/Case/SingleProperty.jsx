import React from 'react';
// import './styles.css'; // Import the CSS file

const SingleProperty = ({counter, text}) => {
  return (
    <div className="single-property-card">
      <div className="count-circle">{counter}</div> {/* Example count */}
      <p className="property-description">{text}</p>
    </div>
  );
};

export default SingleProperty;
