import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Timeline from './pages/Timeline';
import { AuthProvider } from './AuthContext'; // Importando apenas AuthProvider
import './assets/css/style.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Timeline />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
