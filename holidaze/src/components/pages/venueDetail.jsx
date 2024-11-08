import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVenuesById } from "../../constants/api";
import { placeholderImage } from "../../constants/placeholder.jsx";
import { BackButton } from "../backButton.jsx";
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
  }, [id]);
  
  if (loading) {
    return (
      <div className="loader-container">
        <img src="/logo.png" alt="Loading..." className="loader-logo" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-pearl">
      <BackButton />
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-2/3 px-4 mb-4">
            <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
            <div className="flex">
              <MapPinIcon />
              {venue.location?.address && <p>{venue.location.address}</p>}
              
              {venue.location?.city && <p>, {venue.location.city}</p>}
              
              {venue.location?.country && <p>, {venue.location.country}</p>}
              
              {!venue.location?.address && !venue.location?.city && !venue.location?.country && (
                <p>No address available</p>
              )}
            </div>
          </div>
        
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
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
            <div className="flex justify-evenly mb-4">
              <div className={venue.meta.wifi ? "opacity-100" : "opacity-25"}>
                <WifiIcon/>
              </div>
              <div className={venue.meta.breakfast ? "opacity-100" : "opacity-25"}> 
                <BreakfastIcon/>
              </div>
              <div className={venue.meta.parking ? "opacity-100" : "opacity-25"}>
                <ParkingIcon />
              </div>
              <div className={venue.meta.pets ? "opacity-100" : "opacity-25"}>
                <PetIcon />
              </div>
            </div>
            <div className="flex justify-evenly items-center gap-2 mb-4">
              <p>${venue.price} / night</p>
              <p>Max # of guests: {venue.maxGuests}</p>  
            </div>           
            <p className="font-body">{venue.description}</p>
          </div>
        </div>
      </div>  
    </div>
  )
}
