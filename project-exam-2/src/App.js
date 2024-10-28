import { Route, Routes } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}


function App() {
  return (
    <div id="root">
      <main>
      </main>
      
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
