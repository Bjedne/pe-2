import './App.css';
import { Layout } from './components/layout/outlet.jsx';
import { Routes, Route } from 'react-router-dom';
import { Home, Venues, Login, VenueDetail, Register, Profile, CreateVenue, EditVenue } from './components/pages/';

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Layout />}>      
        <Route path="/" index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="venues" element={<Venues />} />
        <Route path="createVenue" element={<CreateVenue />} />
        <Route path="venues/:id" element={<VenueDetail />} />
        <Route path="editVenue/:id" element={<EditVenue />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>  
    </Routes>
   </div>
  );
}

export default App;