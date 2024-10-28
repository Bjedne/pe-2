import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Button } from '@mui/material';

function Home() {
  return (
    <div>
      <Button variant="text">Text</Button>
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
    </div>
  );
}

function App() {
  return (
    <div id="root">
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
