import { useEffect, useRef } from "react";

const TestGoogleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (window.google && mapRef.current) {
        new window.google.maps.Map(mapRef.current, {
          center: { lat: 21.4241, lng: 39.8173 }, // makkah
          zoom: 12,
        });
      }
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDcfN0b1_bI-np84t35URWv3-Im1rCSzpc`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("✅ Google Maps API Loaded Successfully");
      initMap();
    };
    script.onerror = () => {
      console.error("❌ Google Maps API failed to load");
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px",
          border: "2px solid black",
          background: "#f3f3f3",
        }}
      ></div>
    </div>
  );
};

export default TestGoogleMap;
