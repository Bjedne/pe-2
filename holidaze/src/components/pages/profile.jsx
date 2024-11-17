import React, { useEffect, useState } from 'react';

export function Profile() {
  const [profile, setProfile] = useState({ name: "", avatarUrl: "" });

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedAvatarUrl = localStorage.getItem('avatarUrl');
    if (storedName && storedAvatarUrl) {
      setProfile({ name: storedName, avatarUrl: storedAvatarUrl });
    }
  }, []);

  return (
    <div className="flex-1 bg-pearl">
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-center mb-4">Your Profile</h1>
        <div className="flex items-center bg-white p-2 mx-auto w-11/12 rounded-xl drop-shadow">
          <img src={profile.avatarUrl} alt="profile" className="rounded-full w-20 ms-4" />
          <div className="ml-4">
            <p className="text-2xl mt-2">{profile.name}</p>
            <button className="bg-leaf text-white px-4 my-2 py-2 rounded-xl border border-black text-md">Edit avatar</button>
          </div>
        </div>

        <h1>Your Bookings:</h1>
        <div>
          {/* Booking cards */}
        </div>

        <h1 className="">Your Venues:</h1>
        <div>
          {/* Venue cards */}
        </div>


      </div>
    </div>
  );
}
