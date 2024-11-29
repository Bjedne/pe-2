import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// This component is used to scroll to the top of the page when a new page is loaded.

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
     const scrollTimeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Prevents bottom-scroll 

    return () => clearTimeout(scrollTimeout);
  }, [pathname]);

  return null;
}