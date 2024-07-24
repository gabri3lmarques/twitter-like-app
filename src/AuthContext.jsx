import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const setSuccess = (message) => {
    setSuccessMessage(message);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, successMessage, setSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
