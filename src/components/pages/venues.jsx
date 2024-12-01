import { useEffect, useState } from "react";
import { fetchVenues } from "../../api/venues.jsx";
import { Link } from "react-router-dom";
import { BackButton, Loader } from "../ui/index.jsx";
import '../ui/loader.css';

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
    const [visibleVenues, setVisibleVenues] = useState(24); // Track visible venues
    const [searchQuery, setSearchQuery] = useState(""); // Track search input

    useEffect(() => {
        async function getVenues() {
            const data = await fetchVenues();
            setVenues(data.data);
            setLoading(false);
        }
        getVenues();
    }, []);

    const filteredVenues = venues.filter((venue) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showMoreVenues = () => {
        setVisibleVenues((prevVisible) => prevVisible + 24); // Show 24 more venues each time
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex-1 bg-pearl">
            <BackButton />
            <div className="flex justify-center my-6">
                <input
                    type="text"
                    className="w-10/12 lg:w-6/12 p-3 border border-leaf rounded-lg"
                    placeholder="Search for a venue..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="md:grid md:grid-cols-2">
            {filteredVenues.slice(0, visibleVenues).map((venue) => (
                <div key={venue.id} className="flex flex-col w-10/12 mx-auto my-6 border-white border-2 rounded-xl p-2 bg-white drop-shadow-lg gap-2 md:px-6">
                    {venue.media.length > 0 ? (
                        <img
                            className="rounded-xl w-full h-60 object-cover"
                            src={venue.media[0].url}
                            alt={venue.media[0].alternativeText}
                            onError={(e) => { e.target.src = placeholderImage; }}
                        />
                    ) : (
                        <img src={placeholderImage} alt="Placeholder" />
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
                    <p className="font-body overflow-hidden">{truncateText(venue.description, 150)}</p>
                    <div className="flex justify-between items-center">
                        <div></div> {/* Empty div to push the button to the right */}
                        <Link to={`/venues/${venue.id}`} className="flex">
                            <button className="py-3 px-6 rounded-full bg-leaf text-white my-2 me-5">Visit Venue</button>
                        </Link>
                    </div>
                </div>
            ))}
            </div>
            {visibleVenues < filteredVenues.length && (
                <div className="flex justify-center mb-8">
                    <button
                        onClick={showMoreVenues}
                        className="py-3 px-6 rounded-full bg-leaf text-white mt-6"
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
}