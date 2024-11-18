import React, { useEffect, useState } from 'react';
import { options, avatarUpdate } from '../../constants/api';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const [profile, setProfile] = useState({ name: "", avatarUrl: "" });
  const [showModal, setShowModal] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedAvatarUrl = localStorage.getItem('avatarUrl');
    if (storedName && storedAvatarUrl) {
      setProfile({ name: storedName, avatarUrl: storedAvatarUrl });
    }
  }, []);

  const handleChangeAvatar = async () => {
    try {
      const response = await fetch(avatarUpdate, {
        method: "PUT",
        headers: {
          ...options.headers, // Include the Authorization and API key headers
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ avatar: { url: newAvatarUrl, alt: "User Avatar",}, }), // Pass the avatar URL in the request body
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update avatar.");
      }
  
      // Update profile and localStorage
      setProfile((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
      localStorage.setItem("avatarUrl", newAvatarUrl);
      setShowModal(false); // Close modal
      setErrorMessage(""); // Clear errors
      window.location.reload(); // Refresh the page
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="flex-1 bg-pearl">
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-center mb-4">Your Profile</h1>
        <div className="flex items-center bg-white p-2 mx-auto w-11/12 rounded-xl drop-shadow">
          <img src={profile.avatarUrl} alt="profile" className="rounded-full w-20 h-20 ms-4" />
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

        <h1 className="font-bold text-2xl text-center mt-6">Your Bookings:</h1>
        <div>
          {/* Booking cards */}
        </div>

        <h1 className="font-bold text-2xl text-center mt-6">Your Venues:</h1>
        <div>
          {/* Venue cards */}
        </div>
      </div>

      {/* Modal */}
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
            {errorMessage && (
              <p className="text-danger mt-2 text-sm">{errorMessage}</p>
            )}
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
        {/* Log out button */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-danger text-white px-4 my-2 py-2 rounded-xl border border-black text-md"
          onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}