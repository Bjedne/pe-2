import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookingByProfile } from "../../api/bookings";
import { options, avatarUpdate } from "../../constants/api";

export function Profile() {
  const [profile, setProfile] = useState({ name: "", avatarUrl: "" });
  const [bookings, setBookings] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVenueManager, setIsVenueManager] = useState(false);
  const navigate = useNavigate();

  // Load profile from localStorage on mount
  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await bookingByProfile();
        setBookings(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
    const venueManager = localStorage.getItem('venueManager') === 'true';
    const storedName = localStorage.getItem("name");
    const storedAvatarUrl = localStorage.getItem("avatarUrl");
    if (storedName && storedAvatarUrl) {
      setProfile({ name: storedName, avatarUrl: storedAvatarUrl });
    }
    if (storedName && storedAvatarUrl) {
      setProfile({ name: storedName, avatarUrl: storedAvatarUrl });
    }

    setIsVenueManager(venueManager);
  }, []);

  const handleChangeAvatar = async () => {
    try {
      const response = await fetch(avatarUpdate, {
        method: "PUT",
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar: { url: newAvatarUrl, alt: "User Avatar" } }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update avatar.");
      }

      setProfile((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
      localStorage.setItem("avatarUrl", newAvatarUrl);
      setShowModal(false);
      setErrorMessage("");
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // Limit displayed bookings to 5 initially
  const displayedBookings = showAll ? bookings : bookings.slice(0, 3);

  return (
    <div className="flex-1 bg-pearl">
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-center mb-4">Your Profile</h1>
        <div className="flex items-center bg-white p-2 mx-auto w-11/12 rounded-xl drop-shadow">
          <img
            src={profile.avatarUrl}
            alt="profile"
            className="rounded-full w-20 h-20 ms-4"
          />
          <div className="ml-4">
            <p className="text-2xl mt-2">{profile.name}</p>
            <button
              className="bg-leaf text-white px-4 my-2 py-2 rounded-xl border border-black text-md"
              onClick={() => setShowModal(true)}
            >
              Edit avatar
            </button>
          </div>
        </div>
        
        {isVenueManager && (
          <div className="flex justify-center my-2">
            <button className="bg-leaf text-white px-6 my-2 py-2 rounded-3xl text-md">
              Create Venue
            </button>
          </div>
      )}

        <h1 className="font-bold text-2xl text-center mt-6">Your Bookings:</h1>
        {bookings.length === 0 ? (
          <p className="text-center mt-4">You have not made any bookings.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
              {displayedBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow p-4 flex"
                >
                  <img
                    src={booking.venue.media[0]?.url || "https://via.placeholder.com/150"}
                    alt={booking.venue.media[0]?.alt || "Venue Image"}
                    className="rounded h-20 w-20 object-cover self-center"
                  />
                  <div className="flex flex-col ms-4">
                    <div>
                      <h2 className="font-bold text-lg mt-2">{booking.venue.name}</h2>
                    </div>
                    <p className="text-sm">
                      <strong>Guests:</strong> {booking.guests}
                    </p>
                    <p className="text-sm">
                      <strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <strong>Address:</strong> {booking.venue.location.address}, {booking.venue.location.city}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {bookings.length > 5 && (
              <div className="text-center">
                <button
                  className="bg-leaf text-white px-4 py-2 rounded-xl"
                  onClick={() => setShowAll((prev) => !prev)}
                >
                  {showAll ? "Show Less" : "Show All"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Avatar</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter new avatar URL"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
            />
            <button
              className="bg-leaf text-white px-4 py-2 rounded-xl w-full"
              onClick={handleChangeAvatar}
            >
              Change Avatar
            </button>
            {errorMessage && <p className="text-danger mt-2 text-sm">{errorMessage}</p>}
            <button
              className="text-sm underline mt-4"
              onClick={() => {
                setShowModal(false);
                setErrorMessage("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button
          className="bg-danger text-white px-4 my-2 py-2 rounded-xl border border-black text-md"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}