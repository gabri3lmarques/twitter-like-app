import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
