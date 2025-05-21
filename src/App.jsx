import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useNavigate, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from "./App/Components/ScrollTop";
import { AboutCyberify, CaseStudies, ContactUs, Home, Industries, Insights, SingleBlog, AppLayout, ScheduleCall, ServiceDetails, Gallery, GallerySingle, SingleUseCase, Careers, NotFound, ConnectWithUs, Vacancy } from './App/Screens';
// import './assets/css/plugins/bootstrap-grid.css';
// import './assets/css/plugins/font-awesome.min.css';
// import './assets/css/plugins/swiper.min.css';
// import './assets/css/style.css';

// ErrorBoundary Component
// class ErrorBoundary extends React.Component {
//   state = { hasError: false };

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   componentDidCatch(error, info) {
//     console.error("Routing Error:", error, info);
//     // Log this error to an error reporting service if needed
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div style={{ padding: '2rem', textAlign: 'center' }}>
//           <h2>Something went wrong</h2>
//           <button onClick={() => window.location.reload()}>
//             Refresh Page
//           </button>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }


function RemoveTrailingSlash({ children }) {
  const location = useLocation();
  const { pathname, search, hash } = location;

  // Do not redirect if root or no trailing slash
  if (pathname !== '/' && pathname.endsWith('/')) {
      // Remove trailing slash and preserve search and hash
      const newPath = pathname.slice(0, -1) + search + hash;
      return <Navigate to={newPath} replace />;
  }

  return children;
}

// AppWrapper Component
function AppWrapper() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Offline fallback
  if (!isOnline) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>You're offline</h2>
        <p>Please check your internet connection and try again.</p>
      </div>
    );
  }
  

  return (
    // <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <RemoveTrailingSlash>
        <Routes>
          {/* Wrap all routes with AppLayout */}
          <Route path="/" element={<AppLayout />}>
            {/* <Route index element={<ErrorBoundary><Home /></ErrorBoundary>} /> */}
            <Route index element={<Home />}/>
            <Route path="service/:service_slug" element={<ServiceDetails />} />
            <Route path="insights" element={<Insights />} />
            <Route path="insight/:slug" element={<SingleBlog />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="case-study/:slug" element={<SingleUseCase />} />
            <Route path="vacancy/:slug" element={<Vacancy />} />
            <Route path="industry/:industry_slug" element={<Industries />} />
            <Route path="schedule-consulation" element={<ScheduleCall />} />
            <Route path="about-cyberify" element={<AboutCyberify />} />
            <Route path="connect-with-us" element={<ConnectWithUs />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery-images/:slug" element={<GallerySingle />} />
            <Route path="careers" element={<Careers />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
          </Route>
        </Routes>
        </RemoveTrailingSlash>
      </BrowserRouter>
    // </ErrorBoundary>
  );
}

export default AppWrapper;