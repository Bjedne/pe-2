import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { venues } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [venues]);

  return null;
}