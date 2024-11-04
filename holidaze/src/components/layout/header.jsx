import { HamburgerIcon, ProfileIcon } from '../icons.jsx';
import { Link } from 'react-router-dom';

export function Header() {
    return (
      <header className="bg-wood p-4 flex justify-between items-center">
        <Link to="/">
        <div className="flex items-center gap-1 ms-2">
          <img src='/logo.png' alt='Holidaze logo' className='w-16 drop-shadow-xl' />
          <h1 className="text-white text-2xl font-sans font-extrabold">Holidaze</h1>
        </div>
        </Link>
        <div className="flex items-center gap-3 me-2">
          <ProfileIcon />
          <HamburgerIcon />
        </div>
      </header>
    );
  }

