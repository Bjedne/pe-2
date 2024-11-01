import './App.css';
import { HamburgerIcon, ProfileIcon } from './components/icons.jsx';
import { Routes, Route, Outlet } from 'react-router-dom';

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
    <footer className="bg-wood p-5 text-white text-center">
      <p>&copy; 2024 Holidaze</p>
    </footer>
  );
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}


function Home() {
  return (
    <div>
      <h2 className="font-serif text-center mt-4 text-2xl font-bold italic">
        Book your holidayz through Holidaze!
      </h2>
      
      <div className="mb-5">
        <div className="relative flex flex-col items-center text-center mx-auto w-full h-[200px] overflow-hidden">        
          
          {/* Text content and button */}
          <div className="relative top-8 z-10 text-white flex flex-col items-center">
            <p>Looking for a calm place in the mountains?</p>
            <p>Maybe you want to explore the city?</p>
            <p>Have a look at all the beautiful venues available!</p>
            <button className="mt-4 px-4 py-2 bg-leaf text-white rounded-full">Browse</button>
          </div>

          {/* Background image */}
          <img
            src="/images/concrete_house.jpg"
            alt="Concrete House"
            className="absolute inset-0 w-full h-full object-cover"/> { /* https://unsplash.com/photos/brown-and-white-concrete-house-uOYak90r4L0?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash */ }
          <div className="absolute inset-0 h-full bg-black opacity-55"></div>
        </div>
      </div>

      <div className="mb-5">
        <div className="relative flex flex-col items-center text-center mx-auto w-full h-[200px] overflow-hidden">        
          
          {/* Text content and button */}
          <div className="relative top-10 z-10 text-white flex flex-col items-center mx-5">
            <p>Owner of a venue and you want to rent it out?
            Register an account and create a listing!</p>
            <button className="mt-4 px-4 py-2 bg-leaf text-white rounded-full">Register</button>
          </div>

          {/* Background image */}
          <img
            src="/images/medieval_house.jpg"
            alt="Old House"
            className="absolute inset-0 w-full h-full object-cover"/> {/* https://unsplash.com/photos/brown-2-storey-house-6fxiPO6bPpM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash */}
          <div className="absolute inset-0 h-full bg-black opacity-55"></div>
        </div>
      </div>

    </div>
  );
}


function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1 bg-pearl">

      </main>

      
    
    <Routes>
      <Route path="/" element={<Layout />}>      
        <Route path="/" element={<Home />} />
      </Route>  
    </Routes>
   </div>
  );
}

export default App;
