import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../ui/loader";

export function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay to make sure everything is loaded before rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after resources are loaded
    }, 500); // Simulate loading delay

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex-1 bg-pearl">
      <h2 className="font-serif text-center mt-4 text-2xl font-bold italic">
        Welcome to Holidaze!
      </h2>
      <h2 className="font-serif text-center mt-4 text-2xl font-bold italic">
        Book your holidays through Holidaze!
      </h2>
      <div className="my-5">
        <div className="relative flex flex-col items-center text-center mx-auto w-full h-[200px] md:h-[250px] overflow-hidden">        
          
          {/* Text content and button */}
          <div className="relative top-8 md:top-16 z-10 text-white flex flex-col items-center">
            <p>Looking for a calm place in the mountains?</p>
            <p>Maybe you want to explore the city?</p>
            <p>Have a look at all the beautiful venues available!</p>
            <Link to="/venues">
              <button className="mt-4 px-4 py-2 bg-leaf text-white rounded-full">Browse</button>
            </Link>
          </div>

          {/* Background image */}
          <img
            src="/images/concreteHouse.jpg"
            alt="Concrete House"
            className="absolute inset-0 w-full h-full object-cover"/> { /* https://unsplash.com/photos/brown-and-white-concrete-house-uOYak90r4L0?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash */ }
          <div className="absolute inset-0 h-full bg-black opacity-55"></div>
        </div>
      </div>
      <div className="mb-5">
        <div className="relative flex flex-col items-center text-center mx-auto w-full h-[200px] md:h-[250px] overflow-hidden">        
          
          {/* Text content and button */}
          <div className="relative top-10 md:top-20 z-10 text-white flex flex-col items-center mx-5">
            <p>Owner of a venue and you want to rent it out?
            Register an account and create a listing!</p>
            <Link to="/register">
            <button className="mt-4 px-4 py-2 bg-leaf text-white rounded-full">Register</button>
            </Link>
          </div>

          {/* Background image */}
          <img
            src="/images/medievalHouse.jpg"
            alt="Old House"
            className="absolute inset-0 w-full h-full object-cover"/> {/* https://unsplash.com/photos/brown-2-storey-house-6fxiPO6bPpM?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash */}
          <div className="absolute inset-0 h-full bg-black opacity-55"></div>
        </div>
      </div>
    </div>
  );
}