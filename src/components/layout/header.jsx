import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HamburgerIcon, ProfileIcon } from "../icons.jsx";

export function Header() {
  const location = useLocation();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const [closing, setClosing] = useState(false); // State to handle closing animation

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

  const toggleMenu = () => {
    if (menuOpen) {
      setClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setClosing(false);
      }, 500); // Match the duration of the slide-up animation
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-wood p-4 flex justify-between items-center z-50 relative">
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
        <div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex flex-row gap-6 text-xl font-bold text-white">
          <li>
            <Link
              to="/"
              className={`${
                location.pathname === "/" ? "bg-leaf drop-shadow-md border-2 border-leaf p-2 rounded-md" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/venues"
              className={`${
                location.pathname === "/venues" ? "bg-leaf drop-shadow-md border-2 border-leaf p-2 rounded-md" : ""
              }`}
            >
              Venues
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link
                to="/profile"
                className={`${
                  location.pathname === "/profile" ? "bg-leaf drop-shadow-md border-2 border-leaf p-2 rounded-md" : ""
                }`}
              >
                Profile
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  className={`${
                    location.pathname === "/register" ? "bg-leaf drop-shadow-md border-2 border-leaf p-2 rounded-md" : ""
                  }`}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className={`${
                    location.pathname === "/login" ? "bg-leaf drop-shadow-md border-2 border-leaf p-2 rounded-md" : ""
                  }`}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
        </div>
        <div className="flex items-center gap-3 me-2 lg:me-6 relative">
          {isLoggedIn ? (
            avatarUrl ? (
              <Link to="/profile">
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="w-10 h-10 lg:w-15 lg:h-15 rounded-full border-leaf border"
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
          <button onClick={toggleMenu} aria-label="Toggle menu" className="lg:hidden">
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* Fullscreen Hamburger Menu */}
      {menuOpen && (
        <div className={`fixed inset-0 bg-pearl flex flex-col items-center text-center top-20 pt-10 z-40 ${closing ? 'slide-up' : 'slide-down'}`}>
          
          <ul className="flex flex-col gap-6 text-4xl font-bold">
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/venues" onClick={toggleMenu}>
                Venues
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link to="/profile" onClick={toggleMenu}>
                  Profile
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/register" onClick={toggleMenu}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={toggleMenu}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
