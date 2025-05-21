import {useState} from "react";
const IndustryHero = ({ name, image }) => {

  const [loaded, setLoaded] = useState(false);

  return (
<div
  style={{
    marginTop: "100px",
    position: "relative",
    background: `url("${image}") center center / cover no-repeat`,
    zIndex: 1,
  }}
>
  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.70)", // Adjust opacity as needed
      zIndex: 1,
    }}
  ></div>

  <img
    src={image}
    alt="background"
    style={{ display: "none" }}
    onLoad={() => setLoaded(true)}
  />

  {/* {loaded && ( */}
    <div
      className="d-flex align-items-center justify-content-center mil-p-120-120"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        zIndex: 2, // Ensure it's above the overlay
      }}
    >
      <h1
        
        style={{
          color: "white",
          fontSize: "2.5rem",
          textAlign: "center",
        }}
      >
        {loaded ? name : "Loading..."}
      </h1>
    </div>
  {/* )} */}
</div>

  );
};

export default IndustryHero;
