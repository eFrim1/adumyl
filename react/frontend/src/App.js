import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>} />
          <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;