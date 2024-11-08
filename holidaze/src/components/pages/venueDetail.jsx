import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVenuesById } from "../../constants/api";

export function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getSingleVenue() {
      const data = await fetchVenuesById(id);
      setVenue(data.data);
      setLoading(false);
    }
    getSingleVenue();
  }, []);
  
  if (loading) {
    return (
      <div className="loader-container">
        <img src="/logo.png" alt="Loading..." className="loader-logo" />
      </div>
    );
  }

  return (
    <div>Hello</div>
  )
}