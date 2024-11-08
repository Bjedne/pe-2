import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVenuesById } from "../../constants/api";
import { placeholderImage } from "../../constants/placeholder.jsx";
import { WifiIcon, MapPinIcon, BreakfastIcon, ParkingIcon, PetIcon } from "../icons.jsx";

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
    <div className="flex-1 bg-pearl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-2/3 px-4 mb-8">
            <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>
            <MapPinIcon />
          </div>
        
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
          {venue.media.length > 0 ? (
          <img
                className="rounded-xl w-full h-60 object-cover"
                src={venue.media[0].url}
                alt={venue.media[0].alternativeText}
                onError={(e) => { e.target.src = placeholderImage; }}
              />
            ) : (
              <img src="/images/housePlaceholder.png" alt="Placeholder" />
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-2/3 px-4 mb-8">
           <div className="flex justify-evenly">
            <WifiIcon />
            <BreakfastIcon />
            <ParkingIcon  />
            <PetIcon />
           </div>
            <div className="flex justify-evenly items-center gap-2">
              <p>${venue.price} / night</p>
              <p>Max # of guests: {venue.maxGuests}</p>  
            </div>           
            {/* insert rating here */}
            <p className="font-body">{venue.description}</p>
          </div>
        </div>
      </div>  
    </div>
  )
}