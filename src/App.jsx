import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DataSpasial from './pages/DataSpasial';
import DataTabular from './pages/DataTabular';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dataspasial" element={<DataSpasial />} />
        <Route path="/datatabular" element={<DataTabular />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
