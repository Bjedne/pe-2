import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVenuesById } from "../../api/venues.jsx";
import { placeholderImage } from "../../constants/placeholder.jsx";
import { BackButton } from "../ui/backButton.jsx";
import { Calendar } from 'react-calendar';
import { WifiIcon, MapPinIcon, BreakfastIcon, ParkingIcon, PetIcon } from "../icons.jsx";
import { Select } from "@headlessui/react";
import { bookingsEndpoint, options } from "../../constants/api.jsx";
import { Loader } from "../ui/loader.jsx";
import { BookingSection } from "../booking/BookingSection.jsx";

// Function to send the booking request
async function makeBookingRequest(dateFrom, dateTo, guests, venueId) {
  const requestBody = {
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    guests: guests,
    venueId: venueId
  };

  try {
    const response = await fetch(bookingsEndpoint, {
      method: 'POST',
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Booking failed');
    }

    const responseData = await response.json();
    console.log('Booking success:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error:', error);
  }
}

export function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);
  const [date, setDate] = useState(null);
  const [guests, setGuests] = useState(1); // Default guests to 1
  const [loggedIn, setLoggedIn] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // Store popup message
  const [popupVisible, setPopupVisible] = useState(false);

    // Disable booked dates on the calendar
    const isDateDisabled = (date) =>
      bookedDates.some(
        (bookedDate) => bookedDate.toDateString() === date.toDateString()
      );
  
    // Handle book now click
    const handleBookNow = async () => {
      if (date && date.length === 2) { // Ensure a date range is selected
        try {
          const response = await makeBookingRequest(date[0], date[1], guests, id);
          console.log('Booking response:', response);
          // eslint-disable-next-line
          if (response.status = 201) { 
            setPopupMessage("Booking successfully created!");
            setPopupVisible(true);
            const timer = setTimeout(() => {
              window.location.reload();
            }, 2000);
            return () => clearTimeout(timer);
          } else {
            console.error('Booking failed:', response);
            throw new Error("Booking failed");
          }
        } catch (error) {
          console.error('Booking error:', error);
          setPopupMessage("There was an error with your booking. Please contact support if this persists.");
          setPopupVisible(true);
        }
      } else {
        alert("Please select a date range.");
      }
    };

  useEffect(() => {
    const userToken = localStorage.getItem("accessToken");
    setLoggedIn(!!userToken);

    async function getSingleVenue() {
      try {
        const data = await fetchVenuesById(id);
        const venueById = data.data;
        const venueBookings = venueById.bookings;

        setVenue(venueById);

        const dates = venueBookings.flatMap((booking) => {
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
    return <Loader />;
  }

  return (
    <div className="flex-1 bg-pearl flex flex-col">
      <BackButton />
      <div className="container px-4 py-3 lg:flex md:mx-auto">
        <div className="flex flex-col flex-wrap -mx-4 lg:w-3/4 md:mx-auto">
          <div className="w-full md:w-1/2 lg:w-2/3 px-4 mb-4 md:mx-auto lg:text-center">
            <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
            <div className="flex md:mx-auto lg:justify-center">
              <MapPinIcon />
              {venue.location?.address && <p>{venue.location.address}</p>}
              {venue.location?.city && <p>, {venue.location.city}</p>}
              {venue.location?.country && <p>, {venue.location.country}</p>}
              {!venue.location?.address && !venue.location?.city && !venue.location?.country && (
                <p>No address available</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-6 md:mx-auto">
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

          <div className="w-full md:w-1/2 lg:w-2/3 px-4 mb-8 lg:flex lg:flex-col md:mx-auto">
            <div className="flex justify-evenly mb-4">
              <div className={venue.meta.wifi ? "opacity-100" : "opacity-25"}>
                <WifiIcon />
              </div>
              <div className={venue.meta.breakfast ? "opacity-100" : "opacity-25"}>
                <BreakfastIcon />
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
            <p className="font-body md:mx-auto">{venue.description}</p>
            
            <BookingSection
        venue={venue}
        bookedDates={bookedDates}
        date={date}
        setDate={setDate}
        guests={guests}
        setGuests={setGuests}
        loggedIn={loggedIn}
        onBookNow={handleBookNow}
      />


            <div className="flex gap-4 mt-2 justify-center">
              <p>Number of guests:</p>
              <Select
                className="mt-1 block"
                name="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              >
                {/* Generate options from 1 to maxGuests */}
                {Array.from({ length: venue.maxGuests }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Select>
            </div>
            {popupVisible && (
              <div className="flex justify-center mt-4">
                <p className="rounded-md p-3 drop-shadow bg-neutral">
                  {popupMessage}
                </p>
              </div>
            )}
            <div className="flex justify-center">
              {loggedIn ? (
                <button
                  onClick={handleBookNow}
                  className="py-3 px-6 rounded-full bg-leaf text-white my-5"
                >
                  Book Now
                </button>
              ) : (
                <Link to="/login">
                  <p className="py-3 px-6 rounded-full bg-gray-300 text-center my-5 underline">
                    Register or log in to book
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}