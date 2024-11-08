import { useEffect, useState } from "react";
import { fetchVenues } from "../../constants/api";
import { Link } from "react-router-dom";
import { BackButton } from "../backButton";
import '../loader.css';

const placeholderImage = "/housePlaceholder.png";

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
}

export function Venues() {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function getVenues() {
        const data = await fetchVenues();
        setVenues(data.data);
        setLoading(false);
      }
      getVenues();
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
        <BackButton />
          {venues.map((venue) => (
            <div key ={venue.id} className="flex flex-col w-10/12 mx-auto my-6 border-white border-2 rounded-xl p-2 bg-white drop-shadow-lg gap-2">
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
                <div className="flex flex-col">
                    <h1 className="text-2xl font-sans">{venue.name}</h1>
                    <p>{venue.location?.city}</p>
                </div>
                <div className="flex gap-5">
                    <p>${venue.price} / night</p>
                    <p>|</p>
                    <p>Max # of guests: {venue.maxGuests}</p>
                </div>
                <p className="font-body">{truncateText(venue.description, 150)}</p>
                <div className="flex justify-between items-center">
            <div></div> {/* Empty div to push the button to the right */}
            <Link to={`/venues/${venue.id}`} className="flex">
              <button className="py-3 px-6 rounded-full bg-leaf text-white my-2 me-5">Visit Venue</button>
            </Link>
          </div>
                

            </div>
          ))}
        </div>
    )
}
