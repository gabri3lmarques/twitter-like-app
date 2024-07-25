import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CreatePost from './pages/CreatePost';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Timeline from './pages/Timeline';
import { AuthProvider, AuthContext } from './AuthContext'; // Importe o AuthProvider e AuthContext
import './assets/css/style.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <AuthContext.Consumer>
          {({ user }) => (
            user && <CreatePost />
          )}
        </AuthContext.Consumer>
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
