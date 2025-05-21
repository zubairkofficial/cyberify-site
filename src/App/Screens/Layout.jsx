import { Outlet, useLocation } from "react-router-dom";
import AppNavbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import SupportBot from "../Components/SupportBot";
import { useEffect } from "react";
import Helpers from "../Config/Helpers";
import NewFooter from "../Components/Home/NewFooter";
// import $ from "jquery";

const AppLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    Helpers.loadScript("plugins/jquery.min.js")
      .then(() => Helpers.loadScript("plugins/swiper.min.js"))
      .then(() => Helpers.loadScript("main.js"))
      .catch((error) => console.error("Script loading failed: ", error));
  }, [location.pathname]);

  return (
    <div className="mil-wrapper">
      <AppNavbar />
      <Outlet />
      <Footer />
      {/* <NewFooter /> */}
      {/* <SupportBot showSupportBot={true} /> */}
    </div>
  );
};

export default AppLayout;
