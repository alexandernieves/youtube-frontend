import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { LoadingContext } from "../context/LoadingContext";

const RouteChangeTracker = () => {
  const location = useLocation();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return null;
};

export default RouteChangeTracker;
