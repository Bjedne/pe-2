import './App.css';
import { Layout } from './components/layout/outlet.jsx';
import { Routes, Route} from 'react-router-dom';
import { fetchVenues } from './constants/api.jsx';
import { Home } from './components/pages/home.jsx';

fetchVenues();

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Layout />}>      
        <Route path="/" element={<Home />} />
      </Route>  
    </Routes>
   </div>
  );
}

export default App;
