import './App.css';
import { Layout } from './components/layout/outlet.jsx';
import { Routes, Route } from 'react-router-dom';
import { fetchVenues } from './constants/api.jsx';
import { Home, Venues, Login, VenueDetail, Register } from './components/pages/';


fetchVenues();

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Layout />}>      
        <Route path="/" index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="venues" element={<Venues />} />
        <Route path="venues/:id" element={<VenueDetail />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>  
    </Routes>
   </div>
  );
}

export default App;
