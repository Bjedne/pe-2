import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HamburgerIcon, ProfileIcon } from "../icons.jsx";

export function Header() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatarUrl");
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsLoggedIn(true); // User is logged in if token exists
    }

    if (storedAvatar) {
      setAvatarUrl(storedAvatar); // Set avatar URL if available
    }
  }, []);

  return (
    <header className="bg-wood p-4 flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center gap-1 ms-2">
          <img
            src="/logo.png"
            alt="Holidaze logo"
            className="w-16 drop-shadow-xl"
          />
          <h1 className="text-white text-2xl font-sans font-extrabold">
            Holidaze
          </h1>
        </div>
      </Link>
      <div className="flex items-center gap-3 me-2">
        {isLoggedIn ? (
          avatarUrl ? (
            <Link to="/profile">
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-leaf border"
              />
            </Link>
          ) : (
            <Link to="/profile">
              <ProfileIcon />
            </Link>
          )
        ) : (
          <Link to="/login">
            <ProfileIcon />
          </Link>
        )}
        <HamburgerIcon />
      </div>
    </header>
  );
}
