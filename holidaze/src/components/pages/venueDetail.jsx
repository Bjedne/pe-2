import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVenuesById } from "../../api/venues.jsx";
import { fetchBookings } from "../../api/bookings.jsx";
import { placeholderImage } from "../../constants/placeholder.jsx";
import { BackButton } from "../backButton.jsx";
import { Calendar } from 'react-calendar';
import { WifiIcon, MapPinIcon, BreakfastIcon, ParkingIcon, PetIcon } from "../icons.jsx";

export function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("accessToken");
  setLoggedIn(!!userToken);
  
    async function getSingleVenue() {
      try {
        // Fetch venue details
        const data = await fetchVenuesById(id);
        const venueById = data.data.find((v) => v.id === id);
        setVenue(venueById);        

        // Fetch all bookings
        const allBookings = await fetchBookings();    

        const venueBookings = allBookings.filter((venue) => venue.id === id && Array.isArray(venue.bookings))
        .flatMap((venue) => venue.bookings);

        // Extract and format booked dates
        const dates = venueBookings.flatMap(booking => {
          const start = new Date(booking.dateFrom);
          const end = new Date(booking.dateTo);
          const days = [];
          for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
          }
          return days;
        });

        setBookedDates(dates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching venue or bookings data:", error);
      }
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

  // Disable booked dates on the calendar
  const isDateDisabled = (date) =>
    bookedDates.some(
      (bookedDate) =>
        bookedDate.toDateString() === date.toDateString()
    );

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

            <div className="mt-8">
              <h1 className='text-center mb-2'>Choose the date of your booking:</h1>
              <div className='calendar-container'>
                <Calendar
                  onChange={setDate}
                  value={date}
                  selectRange={true}
                  tileDisabled={({ date }) => isDateDisabled(date)}
                />
              </div>
              {date.length > 0 ? (
                <p className='text-center mt-3'>
                  <span className='bold'>Start:</span>{' '}
                  {date[0].toDateString()}
                  &nbsp;|&nbsp;
                  <span className='bold'>End:</span> {date[1].toDateString()}
                </p>
              ) : (
                <p className='text-center'>
                  <span className='bold'>Default selected date:</span>{' '}
                  {date.toDateString()}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              {loggedIn ? (
                <button className="py-3 px-6 rounded-full bg-leaf text-white my-5">
                  Book Now
                </button>
              ) : (
                <Link to="/login"><p className="py-3 px-6 rounded-full bg-gray-300 text-center my-5 underline">
                  Register or log in to book
                </p></Link>
              )}
            </div>
            
          </div>
        </div>
      </div>  
    </div>
  );
}
