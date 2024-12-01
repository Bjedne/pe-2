import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVenuesById } from "../../api/venues";
import { fetchBookings } from "../../api/bookings";
import { BackButton } from "../backButton";
import { Loader } from "../ui/loader";

export function VenueBookings() {
  const { id } = useParams();
  const [venue, setVenue] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to format dates
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(dateString));
  };

  useEffect(() => {
    async function getSingleVenue() {
      try {
        const data = await fetchVenuesById(id);
        const venueById = data.data.find((v) => v.id === id);
        setVenue(venueById);

        const allBookings = await fetchBookings();
        const venueBookings = allBookings
          .filter((venue) => venue.id === id && Array.isArray(venue.bookings))
          .flatMap((venue) => venue.bookings);
        setBookings(venueBookings);
      } catch (error) {
        console.error("Error fetching venue or bookings data:", error);
      }
      setLoading(false);
    }
    getSingleVenue();
  }, [id]);

  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className="flex-1 bg-pearl">
      <BackButton />
      <div className="flex justify-center mt-4">
  <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white">
    <img
      src={venue.media?.[0]?.url}
      alt={`${venue.name} media`}
      className="h-48 w-full object-cover"
    />
    <div className="p-4">
      <h1 className="text-xl font-bold">{venue.name || "No Name Available"}</h1>
      <p className="text-sm mt-2">
        <strong>Address:</strong> {venue.location?.address || "No Address Available"}
      </p>
    </div>
  </div>
</div>

<h2 className="font-bold text-2xl text-center mt-4">Bookings</h2>
      <div className="flex flex-col gap-3 mb-8 lg:flex-row lg:flex-wrap lg:mt-6 lg:w-8/12 lg:mx-auto">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white mx-4 px-2 py-2 font-body rounded-2xl drop-shadow  mx-auto">
            <div className="grid grid-rows-2 grid-flow-col gap-1 mt-1">
              <img
                src={booking.customer?.avatar?.url}
                className="w-20 h-20 object-cover rounded-full row-span-2 col-start-1 justify-self-center"
                alt={`${booking.customer?.name}'s avatar`}
              />
              <p className="col-start-2">
                <strong>Name:</strong> {booking.customer?.name}
              </p>
              <p className="cols-start-2 row-start-2">
                <strong>Email:</strong> {booking.customer?.email}
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <p>From: {formatDate(booking.dateFrom)}</p>
              <p>To: {formatDate(booking.dateTo)}</p>
            </div>
            <p className="text-center"># guests: {booking.guests}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
