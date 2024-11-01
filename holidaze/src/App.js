import './App.css';
import { HamburgerIcon, ProfileIcon } from './components/icons.jsx';

function Header() {
  return (
    <header className="bg-wood p-4 flex justify-between items-center">
      <div className="flex items-center gap-1 ms-2">
        <img src='/logo.png' alt='Holidaze logo' className='w-16 drop-shadow-xl' />
        <h1 className="text-white text-2xl font-sans font-extrabold">Holidaze</h1>
      </div>
      <div className="flex items-center gap-3 me-2">
        <ProfileIcon />
        <HamburgerIcon />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-wood p-4 text-white text-center">
      <p>&copy; 2024 Holidaze</p>
    </footer>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-pearl">

      </main>
      <Footer />
    </div>
   
    
  );
}

export default App;
