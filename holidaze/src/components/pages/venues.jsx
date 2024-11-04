import { useEffect, useState } from "react";
import { fetchVenues } from "../../constants/api";

export function Venues() {

    const placeholderImage = "/housePlaceholder.png";

    const [venues, setVenues] = useState([]);

    useEffect(() => {
      async function getVenues() {
        const data = await fetchVenues();
        setVenues(data.data);
      }
      getVenues();
    }, []);

    return (
         <ul>
          {venues.map((venue) => (
            <li key={venue.id}>
              <h3>{venue.name}</h3>
              <p>{venue.description}</p>
                <p>{venue.price}</p>
                <p>{venue.maxGuests}</p>
                {venue.media.length > 0 ? (
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alternativeText}
                onError={(e) => { e.target.src = placeholderImage; }}
              />
            ) : (
              <img src="/images/housePlaceholder.png" alt="Placeholder" />
            )}
            </li>
          ))}
        </ul>
    )
}